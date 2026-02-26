import { useState, useEffect, useRef } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  useParams, 
  Link, 
  useNavigate 
} from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Heart, 
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star
} from 'lucide-react';


const ProductDetailPage = ({ handleAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const scrollRef = useRef(null);

  // 拖拽滾動相關狀態
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const GCS_JSON_URL = "https://storage.googleapis.com/zonama-project-assets/products.json";

  // 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(GCS_JSON_URL);
        const data = await res.json();
        setAllProducts(data);
        
        // 根據商品ID找到當前商品，若無ID則預設顯示第1個
        const productId = id ? parseInt(id) : 1;
        const foundProduct = data.find(p => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // 若找不到該ID，顯示第一個商品作為範例
          setProduct(data[0]);
        }
      } catch (error) {
        console.error("載入商品失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">載入中...</span>
        </div>
      </div>
    );
  }

  if (!product) return null;

  // 相關商品推薦 (同類別商品)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 10);

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  
  // 按鈕水平滾動邏輯
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // 滑鼠拖拽滾動邏輯
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 調整滾動速度
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* 麵包屑導覽 */}
      <div className='shadow-sm'>
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb ps-4 mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">首頁</Link></li>
              <li className="breadcrumb-item"><span className="text-muted">{product.category}</span></li>
              <li className="breadcrumb-item active fw-bold text-primary text-truncate" style={{ maxWidth: '200px' }} aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 主要商品區 */}
      <section className="container py-4 py-md-5">
        <div className="row g-4 g-lg-5">
          {/* 左側：商品圖片 */}
          <div className="col-12 col-md-6">
            <div className="product-img-wrapper bg-white rounded-4 border border-gray-100 d-flex align-items-center justify-content-center p-md-2" style={{ aspectRatio: '1/1' }}>
              <img 
                src={product.image} 
                alt={product.title} 
                className="img-fluid h-100 object-fit-contain transition-transform"
                style={{ maxHeight: '100%' }}
              />
            </div>
          </div>

          {/* 右側：商品資訊 */}
          <div className="col-12 col-md-6 d-flex flex-column">
            <div className="mb-2">
              <span className="badge rounded-pill bg-primary-100 text-primary px-3 py-2 fw-bold">
                {product.category}
              </span>
            </div>
            <h1 className="fw-bold text-primary-900 mb-3 display-6">{product.title}</h1>
            
            <div className="d-flex align-items-center mb-4 text-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-secondary opacity-25"} />
              ))}
              <span className="text-muted small ms-2">(4.8 / 120 則評論)</span>
            </div>

            <div className="d-flex align-items-baseline mb-4 gap-3">
              <span className="h1 fw-black text-primary mb-0">NT${product.price}</span>
              <del className="h5 text-gray-300 mb-0">NT${product.origin_price}</del>
              <span className="badge bg-danger-subtle text-danger rounded-1">
                -{Math.round((1 - product.price / product.origin_price) * 100)}%
              </span>
            </div>

            <p className="text-muted p-2 mb-4 fs-5 lh-base">
              這款精選的 {product.title} 是專為追求生活品質的您所設計。無論在功能性還是美學設計上，都經過嚴格的把關與挑選。
            </p>

            {/* 購買操作區 */}
            <div className="bg-white p-4 rounded-4 border border-gray-100 mb-4">
              <div className="d-flex align-items-center mb-4">
                <span className="fw-bold me-4 text-secondary">選擇數量</span>
                <div className="input-group" style={{ width: '130px' }}>
                  <button onClick={decrementQty} className="btn btn-outline-secondary border-secondary-subtle rounded-start-pill">
                    <Minus size={16} />
                  </button>
                  <input type="text" readOnly value={quantity} className="form-control text-center bg-white border-secondary-subtle fw-bold" />
                  <button onClick={incrementQty} className="btn btn-outline-secondary border-secondary-subtle rounded-end-pill">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-12 col-sm-8">
                  <button 
                    onClick={() => handleAddToCart({...product, quantity})}
                    className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    加入購物車
                  </button>
                </div>
                <div className="col-6 col-sm-2">
                  <button className="btn btn-outline-primary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="col-6 col-sm-2">
                  <button className="btn btn-outline-primary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* 服務保證 */}
            <div className="row g-3 pt-4">
              <div className="col-4 text-center">
                <div className="text-primary mb-1"><Truck size={24} /></div>
                <div className="small fw-bold text-dark">快速配送</div>
              </div>
              <div className="col-4 text-center border-start border-end">
                <div className="text-primary mb-1"><ShieldCheck size={24} /></div>
                <div className="small fw-bold text-dark">安心保證</div>
              </div>
              <div className="col-4 text-center">
                <div className="text-primary mb-1"><RefreshCw size={24} /></div>
                <div className="small fw-bold text-dark">7天鑑賞</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 分頁標籤區 */}
      <section className="bg-primary-50 py-5 mt-5">
        <div className="container">
          <ul className="nav nav-pills justify-content-center mb-4 gap-2">
            <li className="nav-item">
              <button 
                onClick={() => setActiveTab('description')}
                className={`nav-link px-4 px-md-5 py-2 py-md-3 rounded-pill fw-bold ${activeTab === 'description' ? 'active shadow' : 'bg-white text-secondary border'}`}
              >
                商品詳情
              </button>
            </li>
            <li className="nav-item">
              <button 
                onClick={() => setActiveTab('shipping')}
                className={`nav-link px-4 px-md-5 py-2 py-md-3 rounded-pill fw-bold ${activeTab === 'shipping' ? 'active shadow' : 'bg-white text-secondary border'}`}
              >
                運送與須知
              </button>
            </li>
          </ul>

          <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border border-gray-100 mx-auto" style={{ maxWidth: '900px', minHeight: '300px' }}>
            {activeTab === 'description' ? (
              <div className="fade-in">
                <h3 className="fw-bold text-primary-800 border-bottom pb-3 mb-4">商品詳細說明</h3>
                <p className="text-muted lh-lg">
                  Zonama 精選兼具卓越品質與平實價格的好物。這款 {product.title} 採用高品質材料製作，並經過多項品質測試，確保其耐用度與穩定性。<br /><br />
                  <strong>【產品特色】</strong><br />
                  • 符合人體工學設計，使用更加順手。<br />
                  • 嚴選環保材質，為地球永續盡一份心力。<br />
                  • 輕巧設計，不佔空間且易於收納。
                </p>
                <div className="text-center mt-4">
                  <img src={product.image} alt="detail" className="img-fluid rounded-3 opacity-75" style={{ maxWidth: '300px' }} />
                </div>
              </div>
            ) : (
              <div className="fade-in">
                <h3 className="fw-bold text-dark border-bottom pb-3 mb-4">配送與售後</h3>
                <div className="row g-4">
                  <div className="col-md-6 px-4">
                    <h4 className="h5 fw-bold text-primary mb-3">
                      <Truck size={20} className="me-2" /> 運送方式
                    </h4>
                    <ul className="list-unstyled text-muted small">
                      <li className="d-flex justify-content-between mb-2 pb-2 border-bottom"><span>一般宅配</span><span className="fw-bold text-dark">NT$80</span></li>
                      <li className="d-flex justify-content-between mb-2 pb-2 border-bottom"><span>超商取貨</span><span className="fw-bold text-dark">NT$60</span></li>
                      <li className="text-primary fw-bold">全館消費滿千免運費</li>
                    </ul>
                  </div>
                  <div className="col-md-6 px-4">
                    <h4 className="h5 fw-bold text-primary mb-3">
                      <RefreshCw size={20} className="me-2" /> 退換貨處理
                    </h4>
                    <p className="text-muted small">
                      依消費者保護法，享有商品到貨 7 天鑑賞期（非試用期）。若收到瑕疵、損壞商品，請於簽收後 3 日內聯繫客服處理。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 相關商品輪播 */}
      <section className="container py-5">
        <div className="d-flex align-items-center py-2 mb-4">
          <h2 className="fw-bold text-primary-900 mb-0">猜你也會喜歡...</h2>
        </div>

        <div className="position-relative">
          {/* 左導引按鈕 */}
          <button 
            onClick={() => scroll('left')} 
            className="btn btn-white bg-white shadow-sm border border-primary rounded-circle p-2 position-absolute top-50 start-0 translate-middle-y z-3"
            style={{ marginRight: '-20px', width: '50px', height:'50px' }}
          >
            <ChevronLeft size={24} className="text-primary" />
          </button>

          <div 
            ref={scrollRef}
            className={`d-flex gap-3 gap-md-4 overflow-auto pt-2 pb-4 no-scrollbar ${isDragging ? 'grabbing' : 'grab'}`}
            style={{ scrollSnapType: isDragging ? 'none' : 'x mandatory', scrollBehavior: isDragging ? 'auto' : 'smooth' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {relatedProducts.map((p) => (
              <div key={p.id} className="col-9 col-sm-6 col-md-4 col-lg-3 flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <div className="card h-100 border border-gray-100 shadow-hover transition-all rounded-4 p-3">
                  <Link to={`/product/${p.id}`} className="d-block mb-3 bg-white rounded-3 p-3 overflow-hidden text-center" style={{ aspectRatio: '1/1' }}>
                    <img src={p.image} alt={p.title} className="img-fluid h-100 object-fit-contain zoom-hover" />
                  </Link>
                  <Link to={`/product/${p.id}`} className="text-decoration-none mb-2">
                    <h4 className="h4 fw-bold text-primary-900 text-truncate-2 mb-2" style={{ height: '3em' }}>
                      {p.title}
                    </h4>
                  </Link>
                  <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="h5 fw-bold text-primary mb-0">NT${p.price}</span>
                    <button 
                      onClick={() => handleAddToCart(p)}
                      className="btn btn-primary text-white rounded-4 p-3 border"
                    >
                      <ShoppingCart size={40} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 右導引按鈕 */}
          <button 
            onClick={() => scroll('right')} 
            className="btn btn-white bg-white shadow-sm border border-primary rounded-circle p-2 position-absolute top-50 end-0 translate-middle-y z-3"
            style={{ marginRight: '-20px', width: '50px', height:'50px' }}
          >
            <ChevronRight size={24} className="text-primary" />
          </button>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fw-black { font-weight: 900; }
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rounded-4 { border-radius: 1.5rem !important; }
        .object-fit-contain { object-fit: contain; }
        .transition-transform { transition: transform 0.5s ease; }
        .product-img-wrapper:hover img { transform: scale(1.05); }
        .shadow-hover:hover { 
          box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.08) !important;
          transform: translateY(-5px);
        }
        .btn-white:hover {
          background-color: #f8f9fa !important;
          color: var(--bs-primary) !important;
        }
        .transition-all { transition: all 0.3s ease; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;