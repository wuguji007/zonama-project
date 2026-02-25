import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function FoodBeverage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('全部商品');
  const navigate = useNavigate();
  const { addToCart } = useCart(); // 引入加入購物車功能

  // 分類標籤假資料
  const tabs = ['全部商品', '泡麵/麵條', '微波加熱', '休閒零食'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://storage.googleapis.com/zonama-project-assets/product-list.json');
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          id: item.id || Math.random().toString(),
          title: item.title || item.name || '農心精選商品',
          price: item.price || 0,
          originalPrice: item.originalPrice || item.original_price || Math.round((item.price || 100) * 1.2),
          image: item.image || item.image_url || 'https://placehold.co/300x300',
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error('獲取商品資料失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const newProducts = products.slice(0, 4);
  const mainProducts = products;

  return (
    <div className="product-list-page">
      <div className="container">
        {/* 麵包屑導覽 */}
        <nav aria-label="breadcrumb" className="custom-breadcrumb pt-3 pb-2">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#/">首頁</a></li>
            <li className="breadcrumb-item"><a href="#/food-beverage">食品飲料</a></li>
            <li className="breadcrumb-item active" aria-current="page">NONGSHIM 農心品牌館</li>
          </ol>
        </nav>

        {/* 頂部 Banner */}
        <div className="brand-banner mb-5">
          <img 
            src="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1200&h=400" 
            alt="農心品牌館 Banner" 
            className="banner-img"
          />
          <div className="banner-text-overlay">
            <h1 className="fw-bold mb-2 text-white shadow-text">農心品牌館</h1>
            <p className="text-white shadow-text mb-0 fs-5">您最愛的韓國泡麵都在這</p>
          </div>
        </div>

        {/* NEW! 品牌新品區塊 */}
        <div className="new-arrivals-section mb-5">
          <div className="section-title-wrapper mb-4">
            <span className="text-info fw-bold me-2" style={{color: '#36c5d6'}}>NEW!</span>
            <h3 className="section-title d-inline-block fw-bold mb-0">品牌新品</h3>
          </div>

          <div className="row g-3">
            {loading ? (
              <p className="text-center w-100">載入中...</p>
            ) : (
              newProducts.map(product => (
                <div key={`new-${product.id}`} className="col-6 col-md-3">
                  <div className="product-card text-center">
                    <div className="card-img-wrapper">
                      <img src={product.image} alt={product.title} className="img-fluid" />
                    </div>
                    <div className="card-body pt-3 pb-2 px-2">
                      <h5 className="product-title text-start text-truncate">{product.title}</h5>
                      <div className="price-block text-start">
                        <span className="current-price fw-bold me-2">NT${product.price}</span>
                        <span className="original-price text-muted text-decoration-line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                      {/* ✨ 在新品區塊也加上購物車按鈕 ✨ */}
                      <button 
                        className="btn btn-add-cart w-100 mt-2"
                        onClick={() => addToCart(product)}
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 分類標籤 Tabs */}
        <div className="filter-tabs-container mb-4">
          <ul className="nav nav-tabs custom-tabs hide-scrollbar">
            {tabs.map(tab => (
              <li className="nav-item" key={tab}>
                <button 
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 主要商品列表 */}
        <div className="main-products-section mb-5">
          <div className="row g-3 g-md-4 main-list-row">
            {loading ? (
              <p className="text-center w-100">載入中...</p>
            ) : (
              mainProducts.map(product => (
                <div key={`main-${product.id}`} className="col-12 col-md-3">
                  <div className="product-card main-list-card">
                    <div className="card-img-wrapper">
                      <img src={product.image} alt={product.title} className="img-fluid" />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="product-title">{product.title}</h5>
                        <div className="price-block">
                          <span className="current-price fw-bold me-2">NT${product.price}</span>
                          <span className="original-price text-muted text-decoration-line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>
                      {/* ✨ 修正：正確綁定 onClick 事件 ✨ */}
                      <button 
                        className="btn btn-add-cart w-100 mt-3 d-none d-md-block"
                        onClick={() => addToCart(product)}
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 分頁  */}
      </div>
    </div>
  );
}