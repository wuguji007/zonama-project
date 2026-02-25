import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
// <<<<<<< HEAD
// =======
// import CartPage from './pages/CartPage'
// >>>>>>> 1aea8c2162eb02567f9da82e55d505b60d625b36
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/all.scss'
// 引入 CartProvider
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <CartProvider> {/* 用 CartProvider 包裹 App */}
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>,
)
