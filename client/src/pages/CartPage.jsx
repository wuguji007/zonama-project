import React, { useState, useEffect } from 'react';
//import './CartPage.css'; // 引入上面的 CSS

const CartPage = () => {
  // [State] 購物車商品資料 (模擬從 API 取得)
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: '寵愛營養配方貓飼料2包-獨家配方',
      spec: '規格：包',
      price: 369,
      originalPrice: 1099,
      quantity: 1,
      image: 'https://placehold.co/100',
      delivery: '下單後，商品預計 2026/01/29 出貨(15天後)',
      selected: true
    },
    {
      id: 102,
      name: '麻辣燙湯底方塊2包-獨家配方',
      spec: '規格：一箱入',
      price: 899,
      originalPrice: 1399,
      quantity: 1,
      image: 'https://placehold.co/100',
      delivery: '下單後，由廠商直接出貨',
      selected: true
    }
  ]);

  // [State] 失效商品
  const [invalidItems, setInvalidItems] = useState([
    {
      id: 999,
      name: '無線藍牙耳罩式耳機',
      spec: '規格：黑金色',
      price: 6899,
      originalPrice: 11099,
      image: 'https://placehold.co/100'
    }
  ]);

  // [State] 推薦商品 (模擬 API)
  const recommendations = [
    { id: 201, name: '防水狗狗雨衣', price: 399 },
    { id: 202, name: '貓咪悠閒玩具組', price: 789 },
    { id: 203, name: '狗狗雞肉口味主食罐', price: 1499 },
    { id: 204, name: '寵物專用飲水機', price: 1200 }
  ];

  // [API 預留]: 初始化載入
  useEffect(() => {
    // fetch('/api/cart').then(...)
    console.log('[API Call] 載入購物車資料...');
  }, []);

  // [Logic] 變更數量
  const handleQuantityChange = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        // [API 預留]: POST /api/cart/update-qty
        console.log(`[API Call] 更新商品 ${id} 數量為 ${newQty}`);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // [Logic] 刪除商品
  const handleRemoveItem = (id) => {
    if (window.confirm('確定要移除此商品嗎？')) {
      // [API 預留]: DELETE /api/cart/{id}
      setCartItems(prev => prev.filter(item => item.id !== id));
      console.log(`[API Call] 刪除商品 ${id}`);
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

      {/* Main Content */}
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

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <input type="checkbox" checked={item.selected} readOnly style={{marginTop:'5px', width:'18px', height:'18px'}} />
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
            ))}
          </div>

          {/* 失效商品區 */}
          {invalidItems.length > 0 && (
            <div className="card invalid-section">
              <div className="section-header">
                <span>失效商品 ({invalidItems.length})</span>
                {/* [API]: POST /api/cart/clear-invalid */}
                <button className="remove-all-btn" onClick={() => setInvalidItems([])}>移除全部</button>
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
                    <button className="delete-btn">🗑</button>
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
                  {/* [API]: POST /api/cart/add */}
                  <button className="rec-btn">加入購物車</button>
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
            
            {/* [API]: POST /api/checkout */}
            <button className="checkout-btn">結帳</button>

            {diffForFreeShipping > 0 ? (
               <div className="free-shipping-hint">還差 NT${diffForFreeShipping.toLocaleString()} 可享免運優惠</div>
            ) : (
               <div className="free-shipping-hint">已達免運門檻！</div>
            )}
          </div>
        </div>
      </div>

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