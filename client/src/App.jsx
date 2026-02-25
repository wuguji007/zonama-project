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
import { useState } from 'react';

function App() {
  
  const [verificationEmail, setVerificationEmail] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

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

  // 結帳表單相關
  const [merchantOrderNo] = useState(`ZNM${Date.now()}`);
  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    email: '',
    address: '',
  });

  // 重置資料
  const handleReset = () => {
    setFormData({ receiverName: '', phone: '', email: '', address: '' });
  };

  return (
    <>
      <div className="App d-flex flex-column min-vh-100">
        {/* isLoggedIn 根據是否有 Token 來決定顯示內容 */}
        <Header isLoggedIn={!!token} onLogout={handleLogout} />
        <div className="App-container flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />
            <Route path='/register' element={<RegisterPage setVerificationEmail={setVerificationEmail} />} />
            <Route path='/verify' element={<VerifyPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage/>} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/food-beverage' element={<FoodBeverage />}></Route>

            <Route
              path='/member-center'
              element={
                <MemberCenter user={user} />
                // <ProtectedRoute>
                
                // </ProtectedRoute>
              }
            />

            <Route
              path='/checkout'
              element={
                <CheckoutPage
                  formData={formData}
                  setFormData={setFormData}
                  merchantOrderNo={merchantOrderNo}
                />
              }
            />

            <Route
              path='/payment-complete' 
              element={
                <PaymentCompletePage
                  formData={formData}
                  merchantOrderNo={merchantOrderNo}
                  onReset={handleReset}
                />
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
