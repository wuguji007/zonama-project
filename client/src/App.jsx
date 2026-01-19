import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <div className="App-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>          
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App
