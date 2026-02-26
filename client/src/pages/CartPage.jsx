import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Tag, AlertCircle, ChevronRight,ChevronLeft, Shield, Info, Loader2 } from 'lucide-react';
// import { getCart, updateQuantity, removeCartItem, addToCart, clearInvalidItems, toggleItemSelection } from '../api/cartApi';
// import { useCart } from '../context/CartContext';

const CartPage = ({ products, setProducts, totals, selectedCoupon, onSelect }) => {
  const navigate = useNavigate();
  const allChecked = products.length > 0 && products.every(p => p.checked);

  // [State] 購物車ID和用戶ID
  const [cartId, setCartId] = useState(1); // 假設當前用戶 ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // [State] 購物車商品資料
  const [cartItems, setCartItems] = useState([]);

  // [State] 失效商品
  const [invalidItems, setInvalidItems] = useState([]);

  // ✨ 改從全域 Context 取得購物車資料 ✨
  // const { cartItems, setCartItems } = useCart();
  // const [invalidItems, setInvalidItems] = useState([]); // 暫不處理失效商品
  // [State] 推薦商品
  const recommendations = [
    { id: 201, name: '防水狗狗雨衣', price: 399 },
    { id: 202, name: '貓咪悠閒玩具組', price: 789 },
    { id: 203, name: '狗狗雞肉口味主食罐', price: 1499 },
    { id: 204, name: '寵物專用飲水機', price: 1200 }
  ];

  // [API]: 初始化載入購物車資料
  // useEffect(() => {
  //   loadCartData();
  // }, []);

  // const loadCartData = async () => {
  //     try {
  //       setLoading(true);

  //       // 1. 去你的專屬連結把所有商品資料抓下來
  //       const response = await fetch('https://storage.googleapis.com/zonama-project-assets/products-list.json');
  //       const products = await response.json();

  //       // 2. 把商品列表打亂（洗牌），然後切出前 3 項
  //       const shuffledProducts = products.sort(() => 0.5 - Math.random());
  //       const randomThree = shuffledProducts.slice(0, 3);

  //       // 3. 把這 3 項商品「改裝」成我們購物車需要的格式
  //       const mockCartItems = randomThree.map(product => ({
  //         id: product.id || Math.random().toString(), // 確保有獨一無二的 ID
  //         selected: true, // 預設全部打勾
  //         // 💡 備註：如果你的 JSON 圖片欄位叫 image_url 或 thumbnail，請在這裡修改
  //         image: product.image || product.thumbnail || 'https://placehold.co/100', 
  //         // 💡 備註：如果你的 JSON 商品名稱叫 title，請把 product.name 改成 product.title
  //         name: product.name || product.title || 'Zonama 隨機商品',
  //         spec: product.spec || '標準規格', // 如果 JSON 沒有規格，預設給這個字
  //         price: product.price || 0,
  //         originalPrice: Math.round((product.price || 100) * 1.2), // 偷偷把原價設為售價的 1.2 倍來顯示折扣感
  //         delivery: '滿額免運 / 快速出貨',
  //         quantity: 1 // 預設購買數量為 1
  //       }));

  //       // 更新到 React 的狀態 (State) 裡面
  //       setCartId(1);
  //       setCartItems(mockCartItems);
  //       setInvalidItems([]); // 假資料測試時，先不放失效商品
      
  //       console.log('[測試成功] 已成功從 JSON 隨機載入 3 項商品！', mockCartItems);
  //     } catch (err) {
  //       console.error('[API Error] 載入 JSON 失敗:', err);
  //       setError('無法載入購物車資料，請確認 JSON 連結是否公開可讀取');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // [Logic] 變更數量
  //const handleQuantityChange = async (id, delta) => {
  //  const item = cartItems.find(i => i.id === id);
  //  if (!item) return;

  //  const newQty = Math.max(1, item.quantity + delta);

  //  try {
  //    const updatedCart = await updateQuantity(cartId, id, newQty);
  //    setCartItems(updatedCart.items || []);
  //    console.log(`[API Success] 商品 ${id} 數量已更新為 ${newQty}`);
  //  } catch (err) {
  //    console.error(`[API Error] 更新商品數量失敗:`, err);
  //    alert('更新數量失敗，請重試');
  //  }
  //};

  // [Logic] 變更數量 (純前端測試版)
  // const handleQuantityChange = (id, delta) => {
  //   setCartItems(prevItems => 
  //     prevItems.map(item => {
  //       if (item.id === id) {
  //         // 確保數量最少是 1
  //         return { ...item, quantity: Math.max(1, item.quantity + delta) };
  //       }
  //       return item;
  //     })
  //   );
  // };
  const handleQuantityChange = (id, delta) => {
    setProducts(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };


  // [Logic] 刪除商品
  //const handleRemoveItem = async (id) => {
  //  if (window.confirm('確定要移除此商品嗎？')) {
  //    try {
  //     const updatedCart = await removeCartItem(cartId, id);
  //      setCartItems(updatedCart.items || []);
  //      console.log(`[API Success] 商品 ${id} 已移除`);
  //    } catch (err) {
  //      console.error(`[API Error] 移除商品失敗:`, err);
  //      alert('移除商品失敗，請重試');
  //    }
  //  }
  //};

  // [Logic] 刪除商品 (純前端測試版)
  // const handleRemoveItem = (id) => {
  //   if (window.confirm('確定要移除此商品嗎？')) {
  //     // 直接把該 ID 的商品從陣列中過濾掉
  //     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  //   }
  // };
  const handleRemoveItem = (id) => {
    if (window.confirm('確定要移除此商品嗎？')) {
      // 直接把該 ID 的商品從陣列中過濾掉
      setProducts(prevItems => prevItems.filter(item => item.id !== id));
      // setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  // [Logic] 選中/取消選中商品
  //const handleToggleItemSelection = async (id, currentSelected) => {
  //  try {
  //    const updatedCart = await toggleItemSelection(cartId, id, !currentSelected);
  //    setCartItems(updatedCart.items || []);
  //    console.log(`[API Success] 商品 ${id} 選中狀態已更新`);
  //  } catch (err) {
  //    console.error(`[API Error] 更新選中狀態失敗:`, err);
  //  }
  //};

  // [Logic] 選中/取消選中商品 (純前端測試版)
  // const handleToggleItemSelection = (id) => {
  //   setCartItems(prevItems => 
  //     prevItems.map(item => {
  //       if (item.id === id) {
  //         return { ...item, selected: !item.selected };
  //       }
  //       return item;
  //     })
  //   );
  // };
  const handleToggleItemSelection = (id) => {
    setProducts(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
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
  // const selectedItems = cartItems.filter(item => item.selected);
  // const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const shippingFee = 120;
  // const discount = 0;
  // const total = subtotal + shippingFee - discount;
  // const freeShippingThreshold = 2000;
  // const diffForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  // const selectedItems = cartItems.filter(item => item.selected);
  // const shippingFee = 120;
  // const freeShippingThreshold = 2000;

  // 使用useMemo，避免每次渲染時重複執行filter和reduce等運算
  const cartStats = useMemo(() => {
    const freeShippingThreshold = 1000;
    const discount = 0;
    const selectedItems = products.filter(item => item.checked);
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 120;
    const total = subtotal + shippingFee - discount;
    const diffForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    return {
      selectedItems,
      subtotal,
      shippingFee,
      discount,
      total,
      freeShippingThreshold,
      diffForFreeShipping
    };
  }, [products]);

  // 解構出來使用
  const { 
    selectedItems,
    discount,
    subtotal, 
    shippingFee, 
    total, 
    diffForFreeShipping 
  } = cartStats;

  // [Logic] 結帳
  const handleCheckout = () => {
    // const shippingFee = subtotal > 0 ? 120 : 0; // 沒商品就沒運費
    // const total = subtotal + shippingFee;

    if (selectedItems.length === 0) {
      alert('請選擇要結帳的商品');
      return;
    }
    const orderData = { items: selectedItems, subtotal, shippingFee, total };
    // navigate('/checkout', { state: { orderData } });
    setTimeout(() => navigate('/checkout', { state: { orderData, selectedItem: orderData.items } }), 1500);
  };

const [merchantOrderNo] = useState(`ZNM${Date.now()}`);
  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    email: '',
    address: '',
  });

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

      {/* 加載和錯誤提示 */}
      {loading && <div style={{ padding: '20px', textAlign: 'center' }}>加載購物車中...</div>}
      {error && <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>}

      {/* Main Content */}
      {!loading && (
        <div className='bg-gray-50 pt-4'>
          <div className="cart-container">
            {/* 左欄 */}
            <div className="main-content h-100">
              
              {/* 有效商品列表 */}
              <div className="card h-auto">
                <div className="section-header">
                  <div className="d-flex align-items-center p-2 px-6">
                    <input
                      type="checkbox"
                      className="custom-control-input me-4"
                      style={{ width: '18px', height: '18px' }}
                      id="checkAll"
                      checked={allChecked}
                      onChange={() => {
                        const target = !allChecked;
                        setProducts(prev => prev.map(p => ({ ...p, checked: target })));
                      }}
                    />
                    <label className="text-primary-900 fw-bold" htmlFor="checkAll">快速出貨（{selectedItems.length}）</label>
                  </div>
                  {/* <span>
                    <input type="checkbox" checked readOnly style={{marginRight: '8px'}} />
                    快速出貨 ({products.length})
                  </span> */}
                </div>
                {/* <div className='bg-gray-50 pt-4'>
                  <div className="cart-container">
                    <div className="main-content h-100">
                      <div className="card h-auto">
                        <div className="section-header">
                          <span>快速出貨 ({cartItems.length})</span>
                        </div> */}

                {products.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>購物車是空的</div>
                ) : (
                  products.map(item => (
                    <div key={item.id} className="d-flex align-items-md-center cart-item border-top border-gray-100 py-4 px-6">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggleItemSelection(item.id, item.checked)}
                        style={{ marginTop: '5px', width: '18px', height: '18px' }}
                      />
                      <img src={item.image} alt={item.title} className="item-img flex-shrink-1 h-auto mx-4" />

                      <div className="item-details d-flex flex-column flex-md-row aling-items-center justify-content-between w-100 pe-2">
                        <div className='d-flex flex-column flex-md-row  flex-md-grow-1 justify-content-between'>
                          {/* 商品context */}
                          <div className='d-flex flex-column'>
                            <div>
                              <div className="item-title text-primary-900">{item.title}</div>
                              <div className="item-spec">規格：{item.unit}</div>
                            </div>
                            <div className="d-flex flex-column flex-md-row" style={{ marginBottom: '5px' }}>
                              <span className="current-price">NT${item.price.toLocaleString()}</span>
                              <span className="original-price">NT${item.originalPrice.toLocaleString()}</span>
                            </div>
                            {/* <div className="delivery-info">{item.delivery}</div> */}
                          </div>

                          {/* 商品數量更動 */}
                          <div className=''>
                            <div className="d-flex flex-row justify-content-between border border-gray-200 rounded-pill" style={{maxWidth: '120px'}}>
                              <button className="bg-transparent px-2 qty-btn border-0" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                              <input
                                type="text"
                                className="mx-2 fw-bold border-0"
                                style={{ width: '50px', textAlign: 'center' }}
                                value={item.quantity} readOnly
                              />
                              <button className="bg-transparent px-2 qty-btn border-0" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                            </div> 
                          </div>
                          
                        </div>
                      </div>
                      
                      <div className="item-actions d-flex align-items-md-center flex-shrink-0">
                        <button className="delete-btn mt-2" onClick={() => handleRemoveItem(item.id)}><Trash2 size={18} /></button>                        
                      </div>
                      {/* {cartItems.length === 0 ? (
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
                                <span className="current-price">NT${item.price.toLocaleString()}</span> */}                      
                    </div>
                  ))
                )}
              </div>

              {/* 失效商品區 */}
              {invalidItems.length > 0 && (
                <div className="card invalid-section h-auto">
                  <div className="section-header">
                    <span>失效商品 ({invalidItems.length})</span>
                    <button className="remove-all-btn" onClick={handleClearInvalidItems}>移除全部</button>
                  </div>
                  {invalidItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div style={{ width: '18px' }}></div>
                      <img src={item.image} alt={item.name} className="item-img" style={{ filter: 'grayscale(100%)' }} />
                      <div className="item-details">
                        <div className="item-title" style={{ color: '#999' }}>{item.name}</div>
                        <div className="item-spec">{item.spec}</div>
                        <div>
                          <span className="current-price" style={{ color: '#999' }}>NT${item.price.toLocaleString()}</span>
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
              {/* <div className="card h-auto">
                <div className="section-header px-4">顧客也經常一起買...</div>
                <div className="recommendation-grid d-flex flex-wrap justify-content-around">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="rec-item h-100">
                      <img src="https://placehold.co/100" alt={rec.name} className="rec-img" />
                      <div className="item-title" style={{ fontSize: '13px', height: '38px', overflow: 'hidden' }}>{rec.name}</div>
                      <div className="current-price" style={{ fontSize: '14px' }}>NT${rec.price.toLocaleString()}</div>
                      <button className="rec-btn" onClick={() => handleAddRecommendation(rec)}>加入購物車</button>
                    </div>
                  ))}
                </div>
              </div> */}
              
              {/* // </div>
                    //   </div>
                      
                    //   <div className="item-actions">
                    //     <button className="delete-btn" onClick={() => handleRemoveItem(item.id)}>🗑</button>
                    //     <div className="quantity-selector">
                    //       <button className="qty-btn" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    //       <input type="text" className="qty-input" value={item.quantity} readOnly />
                    //       <button className="qty-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    //     </div>
                    //   </div>
                  //   </div>
                  // )) */}
              {/* )}
              </div> */}
            </div>

            {/* 右欄：結帳明細 */}
            <div className="sidebar">
              <div className="card h-auto summary-card">
                <div className="section-header text-primary-900 fw-bold p-0 px-md-4">結帳明細</div>
                <div className="summary-row pt-4 px-4 border-top border-gray-100 summary-context">
                  <span>商品總金額</span>
                  <span>NT${subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row px-4">
                  <span>運費</span>
                  <span className={shippingFee === 0 ? 'text-success fw-semibold' : ''}>
                    {shippingFee === 0 ? '免運費' : `NT${shippingFee}`}</span>
                </div>
                <div className="summary-row px-4 mb-0 mb-md-4">
                  <span style={{ color: 'var(--primary-blue)' }}>優惠搭配滿額扣抵</span>
                  <span>-NT${discount}</span>
                </div>
                <div className="summary-total border-top border-gray-100 p-0 py-md-4 px-4">
                  <span className='text-primary-900 fw-medium pt-2 py-md-2'>總金額 ({selectedItems.reduce((acc, i) => acc + i.quantity, 0)}件商品)</span>
                  <span>NT${total.toLocaleString()}</span>
                </div>
                
                <button className="checkout-btn mx-4" onClick={handleCheckout}>結帳</button>

                {diffForFreeShipping > 0 ? (
                  <div className="free-shipping-hint text-danger">還差 NT${diffForFreeShipping.toLocaleString()} 可享免運優惠</div>
                ) : (
                  <div className="free-shipping-hint">已達免運門檻！</div>
                )}
              </div>
              {/* <div className="sidebar">
                <div className="card h-auto summary-card">
                  <div className="section-header">結帳明細</div>
                  <div className="summary-row">
                    <span>商品總金額</span>
                    <span>NT${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>宅配運費</span>
                    <span>NT${shippingFee}</span>
                  </div> */}

              {/* 截圖中新增的：選擇優惠或輸入代碼 */}
              {/* <div className="summary-row" style={{ marginTop: '5px', marginBottom: '15px' }}>
                    <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '14px' }}>
                      選擇優惠或輸入代碼
                    </a>
                  </div> */}

              {/* 分隔線 */}
              {/* <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />

                  <div className="summary-total" style={{ borderTop: 'none', marginTop: '0', paddingTop: '0' }}>
                    <span style={{ color: '#333' }}>總金額</span>
                    <span>NT${total.toLocaleString()}</span>
                  </div>

                  <button className="checkout-btn" onClick={handleCheckout}>前往結帳</button> */}
              
              
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default CartPage;