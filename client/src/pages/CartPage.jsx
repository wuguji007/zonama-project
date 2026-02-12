import React, { useState, useEffect } from 'react';
import './CartPage.css'; // 引入上面的 CSS
import { getCart, updateQuantity, removeCartItem, addToCart, clearInvalidItems, toggleItemSelection } from '../api/cartApi';

const CartPage = () => {
  // [State] 購物車ID和用戶ID
  const [cartId, setCartId] = useState(1); // 假設當前用戶 ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // [State] 購物車商品資料
  const [cartItems, setCartItems] = useState([]);

  // [State] 失效商品
  const [invalidItems, setInvalidItems] = useState([]);

  // [State] 推薦商品
  const recommendations = [
    { id: 201, name: '防水狗狗雨衣', price: 399 },
    { id: 202, name: '貓咪悠閒玩具組', price: 789 },
    { id: 203, name: '狗狗雞肉口味主食罐', price: 1499 },
    { id: 204, name: '寵物專用飲水機', price: 1200 }
  ];

  // [API]: 初始化載入購物車資料
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      setLoading(true);
      const cartData = await getCart(1); // 假設用戶 ID 為 1
      if (cartData) {
        setCartId(cartData.id);
        setCartItems(cartData.items || []);
        setInvalidItems(cartData.invalidItems || []);
      }
      console.log('[API Success] 購物車資料已載入');
    } catch (err) {
      console.error('[API Error] 載入購物車失敗:', err);
      setError('無法載入購物車資料');
    } finally {
      setLoading(false);
    }
  };

  // [Logic] 變更數量
  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + delta);

    try {
      const updatedCart = await updateQuantity(cartId, id, newQty);
      setCartItems(updatedCart.items || []);
      console.log(`[API Success] 商品 ${id} 數量已更新為 ${newQty}`);
    } catch (err) {
      console.error(`[API Error] 更新商品數量失敗:`, err);
      alert('更新數量失敗，請重試');
    }
  };

  // [Logic] 刪除商品
  const handleRemoveItem = async (id) => {
    if (window.confirm('確定要移除此商品嗎？')) {
      try {
        const updatedCart = await removeCartItem(cartId, id);
        setCartItems(updatedCart.items || []);
        console.log(`[API Success] 商品 ${id} 已移除`);
      } catch (err) {
        console.error(`[API Error] 移除商品失敗:`, err);
        alert('移除商品失敗，請重試');
      }
    }
  };

  // [Logic] 選中/取消選中商品
  const handleToggleItemSelection = async (id, currentSelected) => {
    try {
      const updatedCart = await toggleItemSelection(cartId, id, !currentSelected);
      setCartItems(updatedCart.items || []);
      console.log(`[API Success] 商品 ${id} 選中狀態已更新`);
    } catch (err) {
      console.error(`[API Error] 更新選中狀態失敗:`, err);
    }
  };

  // [Logic] 加入購物車 (推薦商品)
  const handleAddRecommendation = async (product) => {
    try {
      const updatedCart = await addToCart(cartId, product);
      setCartItems(updatedCart.items || []);
      console.log(`[API Success] 推薦商品 ${product.name} 已加入購物車`);
      alert('已加入購物車！');
    } catch (err) {
      console.error(`[API Error] 加入購物車失敗:`, err);
      alert('加入購物車失敗，請重試');
    }
  };

  // [Logic] 清除失效商品
  const handleClearInvalidItems = async () => {
    try {
      const updatedCart = await clearInvalidItems(cartId);
      setInvalidItems(updatedCart.invalidItems || []);
      console.log(`[API Success] 失效商品已清除`);
    } catch (err) {
      console.error(`[API Error] 清除失效商品失敗:`, err);
      alert('清除失效商品失敗，請重試');
    }
  };

  // [Logic] 計算總金額
  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 120;
  const discount = 0;
  const total = subtotal + shippingFee - discount;
  const freeShippingThreshold = 2000;
  const diffForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // [Logic] 結帳
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert('請選擇要結帳的商品');
      return;
    }

    try {
      const orderData = {
        items: selectedItems,
        subtotal,
        shippingFee,
        discount,
        total
      };

      // 實際的結帳 API 調用可以在這裡進行
      console.log('[API Call] 結帳數據:', orderData);
      
      // 臨時模擬結帳成功
      alert('結帳成功！訂單已提交');
      // 可以在此添加跳轉到結帳頁面或訂單確認頁面
      window.location.href = '#/checkout';
    } catch (err) {
      console.error('[API Error] 結帳失敗:', err);
      alert('結帳失敗，請重試');
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="simple-header">
        <div className="logo">
          ZONAMA <span>購物車</span>
        </div>
        <div style={{color: '#ccc', fontSize: '14px', display:'flex', gap:'15px'}}>
          <div style={{color: 'var(--primary-blue)', fontWeight:'bold'}}>1. 訂單明細確認</div>
          <div>2. 訂購/付款</div>
          <div>3. 訂購完成</div>
        </div>
      </header>

      {/* 加載和錯誤提示 */}
      {loading && <div style={{padding: '20px', textAlign: 'center'}}>加載購物車中...</div>}
      {error && <div style={{padding: '20px', textAlign: 'center', color: 'red'}}>{error}</div>}

      {/* Main Content */}
      {!loading && (
      <div className="cart-container">
        {/* 左欄 */}
        <div className="main-content">
          
          {/* 有效商品列表 */}
          <div className="card">
            <div className="section-header">
              <span>
                <input type="checkbox" checked readOnly style={{marginRight: '8px'}} />
                快速出貨 ({cartItems.length})
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div style={{padding: '20px', textAlign: 'center', color: '#999'}}>購物車是空的</div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <input 
                    type="checkbox" 
                    checked={item.selected} 
                    onChange={() => handleToggleItemSelection(item.id, item.selected)}
                    style={{marginTop:'5px', width:'18px', height:'18px'}} 
                  />
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="item-details">
                    <div className="item-title">{item.name}</div>
                    <div className="item-spec">{item.spec}</div>
                    <div style={{marginBottom:'5px'}}>
                      <span className="current-price">NT${item.price.toLocaleString()}</span>
                      <span className="original-price">NT${item.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="delivery-info">{item.delivery}</div>
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

          {/* 失效商品區 */}
          {invalidItems.length > 0 && (
            <div className="card invalid-section">
              <div className="section-header">
                <span>失效商品 ({invalidItems.length})</span>
                <button className="remove-all-btn" onClick={handleClearInvalidItems}>移除全部</button>
              </div>
              {invalidItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div style={{width:'18px'}}></div>
                  <img src={item.image} alt={item.name} className="item-img" style={{filter:'grayscale(100%)'}} />
                  <div className="item-details">
                    <div className="item-title" style={{color:'#999'}}>{item.name}</div>
                    <div className="item-spec">{item.spec}</div>
                    <div>
                      <span className="current-price" style={{color:'#999'}}>NT${item.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="delete-btn" onClick={() => handleRemoveItem(item.id)}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 推薦商品 */}
          <div className="card">
            <div className="section-header">顧客也經常一起買...</div>
            <div className="recommendation-grid">
              {recommendations.map(rec => (
                <div key={rec.id} className="rec-item">
                  <img src="https://placehold.co/100" alt={rec.name} className="rec-img" />
                  <div className="item-title" style={{fontSize:'13px', height:'38px', overflow:'hidden'}}>{rec.name}</div>
                  <div className="current-price" style={{fontSize:'14px'}}>NT${rec.price.toLocaleString()}</div>
                  <button className="rec-btn" onClick={() => handleAddRecommendation(rec)}>加入購物車</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右欄：結帳明細 */}
        <div className="sidebar">
          <div className="card summary-card">
            <div className="section-header">結帳明細</div>
            <div className="summary-row">
              <span>商品總金額</span>
              <span>NT${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>運費</span>
              <span>NT${shippingFee}</span>
            </div>
            <div className="summary-row">
              <span style={{color:'var(--primary-blue)'}}>優惠搭配滿額扣抵</span>
              <span>-NT${discount}</span>
            </div>
            <div className="summary-total">
              <span>總金額 ({selectedItems.reduce((acc, i)=>acc+i.quantity, 0)}件商品)</span>
              <span>NT${total.toLocaleString()}</span>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>結帳</button>

            {diffForFreeShipping > 0 ? (
               <div className="free-shipping-hint">還差 NT${diffForFreeShipping.toLocaleString()} 可享免運優惠</div>
            ) : (
               <div className="free-shipping-hint">已達免運門檻！</div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Footer */}
      <footer className="simple-footer">
        <div className="footer-logo" style={{fontSize:'30px', fontWeight:'900', color:'var(--primary-blue)', marginBottom:'20px'}}>Z</div>
        <p>關於我們 | 服務條款 | 隱私權政策 | 聯絡我們</p>
        <br/>
        <p>Copyright © 2026 ZONAMA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CartPage;