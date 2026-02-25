import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  // ✨ 改從全域 Context 取得購物車資料 ✨
  const { cartItems, setCartItems } = useCart();
  const [invalidItems, setInvalidItems] = useState([]); // 暫不處理失效商品

  const handleQuantityChange = (id, delta) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    if (window.confirm('確定要移除此商品嗎？')) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  const handleToggleItemSelection = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      })
    );
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 120 : 0; // 沒商品就沒運費
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('請選擇要結帳的商品');
      return;
    }
    const orderData = { items: selectedItems, subtotal, shippingFee, total };
    navigate('/checkout', { state: { orderData } });
  };

  return (
    <div>
      <header className="simple-header shadow-sm bg-white">
        <div className="container header-inner">
          <div className="logo-section">
            <img src="/zonama-logo-sm.svg" alt="Z" className="mobile-logo" />
            <span className="brand-name">ZONAMA</span>
            <span className="cart-title">購物車</span>
          </div>
          <div className="stepper-container">
            <div className="step active">
              <span className="step-badge">1</span>
              <span className="step-text">訂單明細確認</span>
            </div>
            <div className="step-dash">—</div>
            <div className="step">
              <span className="step-badge">2</span>
              <span className="step-text">訂購/付款</span>
            </div>
            <div className="step-dash">—</div>
            <div className="step">
              <span className="step-badge">3</span>
              <span className="step-text">訂購完成</span>
            </div>
          </div>
        </div>
      </header>

      <div className='bg-gray-50 pt-4'>
        <div className="cart-container">
          <div className="main-content h-100">
            <div className="card h-auto">
              <div className="section-header">
                <span>快速出貨 ({cartItems.length})</span>
              </div>

              {cartItems.length === 0 ? (
                <div style={{padding: '40px', textAlign: 'center', color: '#999'}}>
                  購物車是空的，去逛逛吧！
                  <br/><br/>
                  <button className="btn btn-primary" onClick={() => navigate('/food-beverage')}>前往食品區</button>
                </div>
              ) : (                 
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <input 
                      type="checkbox" 
                      checked={item.selected} 
                      onChange={() => handleToggleItemSelection(item.id)}
                      style={{marginTop:'5px', width:'18px', height:'18px'}} 
                    />
                    <img src={item.image} alt={item.title} className="item-img" />
                    <div className="item-details">
                      <div className="item-title">{item.title}</div>
                      <div className="item-spec">標準規格</div>
                      <div style={{marginBottom:'5px'}}>
                        <span className="current-price">NT${item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="delete-btn" onClick={() => handleRemoveItem(item.id)}>🗑</button>
                      <div className="quantity-selector">
                        <button className="qty-btn" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <input type="text" className="qty-input" value={item.quantity} readOnly />
                        <button className="qty-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sidebar">
            <div className="card h-auto summary-card">
              <div className="section-header">結帳明細</div>
              <div className="summary-row">
                <span>商品總金額</span>
                <span>NT${subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>宅配運費</span>
                <span>NT${shippingFee}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
              <div className="summary-total" style={{ borderTop: 'none', marginTop: '0', paddingTop: '0' }}>
                <span style={{ color: '#333' }}>總金額</span>
                <span>NT${total.toLocaleString()}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>前往結帳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;