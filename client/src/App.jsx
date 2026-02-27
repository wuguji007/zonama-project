import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import MemberCenter from './pages/MemberCenter.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentCompletePage from './pages/PaymentCompletePage.jsx';
import FoodBeverage from './pages/FoodBeverage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';


function App() {
  
  const [verificationEmail, setVerificationEmail] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 管理訂單狀態
  const [orderData, setOrderData] = useState(localStorage.getItem('order'));

  //登出功能
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  }

  //保護路由 - 保護需要登入才能訪問的頁面
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };  

  /* 購物車/結帳相關狀態管理 */
  // const [products, setProducts] = useState([]); // 購物車商品
  // const [selectedCoupon, setSelectedCoupon] = useState(null);

  const STORAGE_KEY = 'zonama-cart';

  /* 購物車/結帳相關狀態管理 */
  // 使用「延遲初始化」：在 useState 中傳入函式，只在組件首次掛載時執行一次
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      // 若有資料則解析 JSON，否則回傳空陣列
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error("無法從 localStorage 讀取購物車資料:", error);
      return [];
    }
  });

  // 當 products 狀態改變時，自動更新 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);


  const handleAddToCart = (product) => {
    setProducts(prev => {
      // 檢查購物車是否已有此商品
      const isExists = prev.find(item => item.id === product.id);
      const addQuantity = product.quantity || 1;

      // 商品已存在? 在原有商品上增加數量：否則新增一個newProduct
      if (isExists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + addQuantity } : item
        );
      }

      // 新增商品
      const newProduct = {
        id: product.id,
        category: product.category,
        image: product.image,
        title: product.title,
        price: Number(product.price),
        originalPrice: Number(product.origin_price),
        unit: product.unit,
        quantity: addQuantity,
        checked: true
      };

      return [...prev, newProduct];
    });
  };


  // 優惠券狀態
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 結帳明細和商品數量計算
  const totals = useMemo(() => {
    const checkedItems = products.filter(prod => prod.checked);
    const originalTotal = checkedItems.reduce((acc, p) => acc + p.originalPrice * p.quantity, 0)
    const subTotal = checkedItems.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    const savings = originalTotal - subTotal;
    const shipping = subTotal >= 1000 || subTotal === 0 ? 0 : 120;  // 運費滿千免運
    const totalAmount = subTotal + shipping - (selectedCoupon?.discount || 0);
    const allChecked = products.length > 0 && products.every(p => p.checked);
    const anyChecked = products.some(p => p.checked);
    return {
      originalTotal,
      subTotal,
      savings,
      shipping,
      totalAmount,
      allChecked,
      anyChecked,
      cartTotalQuantity: products.reduce((acc, p) => acc + p.quantity, 0),
      checkedCount: checkedItems.length
    }
  }, [products, selectedCoupon]);

  // 結帳表單相關
  const [merchantOrderNo] = useState(`${Date.now()}`);
  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    email: '',
    address: '',
  });

  // 重置資料
  const handleReset = () => {
    setProducts([]);
    setFormData({ receiverName: '', phone: '', email: '', address: '' });
  };

  return (
    <>
      <div className="App d-flex flex-column min-vh-100">

        {/* isLoggedIn 根據是否有 Token 來決定顯示內容 */}
        <Header
          isLoggedIn={!!token}
          onLogout={handleLogout}
          cartCount={totals.cartTotalQuantity}
        />

        <div className="App-container flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} user={user} />} />
            <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />
            <Route path='/register' element={<RegisterPage setVerificationEmail={setVerificationEmail} />} />
            <Route path='/verify' element={<VerifyPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage/>} />
            <Route path='/food-beverage' element={<FoodBeverage />} />

            <Route
              path='/cart'
              element={
                <CartPage
                  products={products}                  
                  setProducts={setProducts}                 
                  totals={totals}                  
                  selectedCoupon={selectedCoupon}                 
                  onSelect={setSelectedCoupon}
                  checkLoggedIn={!!token}
                />
              }
            />
            
            <Route
              path='/checkout'
              element={
                <CheckoutPage
                  formData={formData}
                  setFormData={setFormData}
                  merchantOrderNo={merchantOrderNo}
                  totals={totals}
                  setOrderData={setOrderData}
                  onReset={handleReset}
                />
              }
            />

            <Route
              path='/payment-complete' 
              element={
                <PaymentCompletePage
                  formData={formData}
                  merchantOrderNo={merchantOrderNo}
                  totals={totals}
                  onReset={handleReset}
                />
              }
            />
            
            <Route
              path="/product/:id"
              element={<ProductDetailPage handleAddToCart={handleAddToCart} />}
            />

            <Route
              path='/member-center'
              element={
                <MemberCenter
                  user={user}
                  orderData={orderData}
                  merchantOrderNo={merchantOrderNo}
                />
                // <ProtectedRoute>
                
                // </ProtectedRoute>
              }
            />
            
          </Routes>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App;
