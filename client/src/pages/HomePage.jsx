import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import HeroSwiper from "../components/HeroSwiper.jsx";
import BackToTop from '../components/BackToTop.jsx';
import { getImageUrl } from "../utils/imageHelper.js";
import { ChevronLeft, ChevronRight, ShoppingCart, Cat, CookingPot } from 'lucide-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/grid';


// 暫時用的類別假資料
const categories = [
    {
        id: 1,
        category: "生活用品",
    },
    {
        id: 2,
        category: "食品飲料",
    },
    {
        id: 3,
        category: "美妝保養",
    },
    {
        id: 4,
        category: "數位家電",
    },
    {
        id: 5,
        category: "嬰幼兒",
    },
    {
        id: 6,
        category: "寵物用品",
    },
    {
        id: 7,
        category: "室內居家",
    },
    {
        id: 8,
        category: "運動生活",
    },
    {
        id: 9,
        category: "廚房用具",
    },
    {
        id: 10,
        category: "手作禮品",
    },
    {
        id: 11,
        category: "限時搶購",
    },
  ];


// 暫時用的商品假資料
const cardSwiperData = [
    {
        id: 1,
        title: "嚴選紅茶茶包組（熱泡／冷泡適用）",
        image: "images/limit-product-1.svg",
        price: "399",
        origin_price: "499",
    },
    {
        id: 2,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    },
    {
        id: 3,
        title: "智慧空氣清淨機（家用型）",
        image: "images/limit-product-3.svg",
        price: "7999",
        origin_price: "8099",
    },
    {
        id: 4,
        title: "保濕滋養沐浴乳",
        image: "images/limit-product-4.svg",
        price: "129",
        origin_price: "209",
    },
    {
        id: 5,
        title: "嚴選紅茶茶包組（熱泡／冷泡適用）",
        image: "images/limit-product-1.svg",
        price: "399",
        origin_price: "499",
    },
    {
        id: 6,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    },
    {
        id: 7,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    },
    {
        id: 8,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    },
    {
        id: 9,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    },
    {
        id: 10,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    },
    {
        id: 11,
        title: "無線藍牙耳罩式耳機",
        image: "images/limit-product-2.svg",
        price: "5399",
        origin_price: "6099",
    }
];

 
const CardSwiper = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 pe-0 px-md-4">
                    <Swiper
                        slidesPerView={1.3}
                        spaceBetween={6}
                        modules={[Navigation]}
                        navigation={true} 
                        loop={true}
                        breakpoints={{
                        378: { slidesPerView: 1.3, spaceBetween: 6 },
                        576: { slidesPerView: 2.2, spaceBetween: 6 },
                        768: { slidesPerView: 3, spaceBetween: 12 },
                        1024: { slidesPerView: 4, spaceBetween: 12 }
                        }}
                    >
                        {cardSwiperData.map((card) => (
                        <SwiperSlide key={card.id} className="swiper-slide">
                            <div className="card product-card d-flex flex-column justify-content-between h-auto rounded-4 p-3 p-md-5">
                                <img src={`${import.meta.env.BASE_URL}${card.image}`} className="card-img-top mb-0 mb-md-4" alt={card.title} />
                                <div className="d-flex flex-column justify-content-between h-100">
                                    <div className="card-body p-0 mb-4">
                                        <h5 className="card-title fw-bold text-primary-950">{card.title}</h5>                                    
                                    </div>
                                    <div className="product-card-footer">
                                        <p className="card-text text-primary-950">NT${card.price} <del className="text-gray-300 fs-6 fw-normal">NT${card.origin_price}</del></p>
                                        <button className="btn btn-primary fw-bold py-4 rounded-pill w-100">加入購物車</button>
                                    </div>
                                </div>                                   
                            </div>                  
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>                        
        </>
    )
}


const GreyCardSwiper = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 pe-0 px-md-4">
                    <Swiper
                        slidesPerView={1.3}
                        spaceBetween={6}
                        modules={[Navigation]}
                        navigation={true} 
                        loop={true}
                        breakpoints={{
                        576: { slidesPerView: 2.2, spaceBetween: 6 },
                        768: { slidesPerView: 3, spaceBetween: 12 },
                        1024: { slidesPerView: 4, spaceBetween: 12 }
                        }}
                    >
                        {cardSwiperData.map((card) => (
                        <SwiperSlide key={card.id} className="swiper-slide">
                            <div className="card product-card-gray d-flex flex-column justify-content-between h-auto rounded-4 border-0 p-3 p-md-5">
                                <img src={`${import.meta.env.BASE_URL}${card.image}`} className="card-img-top mb-0 mb-md-4" alt={card.title} />
                                <div className="d-flex flex-column justify-content-between h-100">
                                    <div className="card-body p-0 mb-4">
                                        <h5 className="card-title fw-bold text-primary-950">{card.title}</h5>
                                    </div>
                                    <div className="product-card-footer">
                                        <p className="card-text text-primary-950">NT${card.price} <del className="text-gray-300 fs-5 fw-normal">NT${card.origin_price}</del></p>
                                        <button className="card-btn btn btn-primary fw-bold py-3 py-md-4 rounded-pill w-100">加入購物車</button>                                            
                                    </div>                                            
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper> 
                </div>
            </div>             
        </>
    )
}


//精選推薦區-網格卡片輪播元件
const products = cardSwiperData;

const CardCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // 拖曳/滑動相關 State (整合滑鼠與觸控)
    const [dragStartX, setDragStartX] = useState(null);
    const [dragEndX, setDragEndX] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // 觸發滑動的最小距離 (px)
    const minSwipeDistance = 50; 
  
    // 每頁顯示 6 張卡片 (2欄 x 3行)
    const itemsPerSlide = 6;

    // 將產品分組(Chunks) 
    const slides = [];
    for (let i = 0; i < products.length; i += itemsPerSlide) {
    slides.push(products.slice(i, i + itemsPerSlide));
    }

    const nextSlide = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
    setActiveIndex(index);
    };


    // --- 通用滑動處理邏輯 ---
  
    const handleDragStart = (clientX) => {
        setDragEndX(null);
        setDragStartX(clientX);
        setIsDragging(true);
    };

    const handleDragMove = (clientX) => {
        if (isDragging) {
            setDragEndX(clientX);
        }
    };

    const handleDragEnd = () => {
        if (!dragStartX || !dragEndX) {
            setIsDragging(false);
            return;
        }
        
        const distance = dragStartX - dragEndX;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
        
        // 重置狀態
        setIsDragging(false);
        setDragStartX(null);
        setDragEndX(null);
    };

    // --- 觸控事件 ---
    const onTouchStart = (e) => handleDragStart(e.targetTouches[0].clientX);
    const onTouchMove = (e) => handleDragMove(e.targetTouches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    // --- 滑鼠事件 ---
    const onMouseDown = (e) => {
        e.preventDefault(); // 防止預設拖曳圖片行為
        handleDragStart(e.clientX);
    };
    const onMouseMove = (e) => {
        if (isDragging) e.preventDefault();
        handleDragMove(e.clientX);
    };
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
        if (isDragging) handleDragEnd(); // 滑鼠離開區域視為結束拖曳
    };

    return (
        <div className="d-flex flex-column">
            <div className="position-relative px-2">
                
                {/* 輪播主體 */}
                <div
                    id="productGridCarousel"
                    className="carousel-slide"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                >
                
                    {/* 左右導航按鈕 (Lucide Icons) */}
                    <button 
                    className="nav-btn nav-prev" 
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    >
                    <ChevronLeft size={24} color="#333" />
                    </button>
                    <button 
                    className="nav-btn nav-next" 
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    >
                    <ChevronRight size={24} color="#333" />
                    </button>
                       
                    <div className="carousel-inner">
                        {slides.map((slideProducts, slideIndex) => (
                            <div 
                            key={slideIndex} 
                            className={`carousel-item ${slideIndex === activeIndex ? 'active' : ''}`}
                            >
                                
                                <div className="grid-container-wrapper"> 
                                    {/* Grid 結構: g-0 (No Gutters) */}
                                    <div className="row g-0">
                                        {slideProducts.map((product) => (
                                        /* 響應式設定: 
                                            col-12: 手機單欄 (每頁6個 = 6行)
                                            col-md-6: 電腦雙欄 (每頁6個 = 3行) 
                                        */
                                            <div key={product.id} className="col-12 col-md-6">
                                                <div className="grid-card product-card">
                                                    <div className="row g-0">
                                                        <div className="col-6">
                                                            <div className="card-img-wrapper">
                                                                <img 
                                                                src={`${import.meta.env.BASE_URL}${product.image}`} 
                                                                className="card-img-top" 
                                                                alt={product.title} 
                                                                />
                                                            </div>
                                                        </div>
                                                                
                                                        <div className="col-6 d-flex flex-column">
                                                            <div className="card-body d-flex flex-column p-3">                              
                                                                <h6 className="card-title fw-bold fs-5 fs-md-4 mb-1">{product.title}</h6 >
                                                                
                                                                <div className="d-flex justify-content-between align-items-start align-items-md-start flex-column align-items-start mt-auto pt-2 border-top">
                                                                    <div className="d-flex flex-column align-items-start align-items-md-start">
                                                                        <span className="text-primary-950 fw-bold fs-4">NT${product.price}</span>
                                                                        <del className='text-gray-300 fs-6 fs-md-5 mb-2'>${product.origin_price}</del>
                                                                    </div>
                                                                    <button className="btn btn-add-cart text-white fw-bold btn-sm rounded-pill w-100 py-3 d-flex align-items-center shadow-sm d-none d-md-block" style={{ fontSize: '0.8rem' }}>
                                                                        加入購物車
                                                                    </button>
                                                                    {/* <button className="btn bg-primary text-white btn-sm rounded-circle px-2 py-2 d-flex align-items-center shadow-sm d-block d-md-none" style={{ fontSize: '0.8rem' }}>
                                                                    <ShoppingCart size={20} className="" />
                                                                    </button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots (Bootstrap Indicators) */}
                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
                            <button
                            key={index}
                            type="button"
                            onClick={() => goToSlide(index)}
                            className={index === activeIndex ? "active" : ""}
                            aria-current={index === activeIndex ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>               
                </div>
            </div>
        </div>
    );
};
//精選推薦區-網格卡片輪播元件



export default function Home() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            {/* 回到頂層錨點 */}
            <a id="nav-top"></a>

            {/* Menu 商品類別選單 */}
            <div className="container category-container">
                <div className="container-fluid px-0">
                    <div className="d-flex justify-content-between align-items-center p-0 mb-0">
                        <div className="btn-group position-relative me-1">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                type="button"
                                className="btn border-primary border-1 rounded-1 my-1 text-primary fw-bold category-link dropdown-btn dropdown-btn-hover"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                所有類別
                            </button>
                            {/* Dropdown Menu下拉選單 - Desktop/Tablet */}
                            <ul className="dropdown-menu rounded-1 py-7 px-4 p-md-2">
                                {categories.map((cat) => (
                                    <li key={cat.id} className='py-3 rounded-1'>
                                        <a className="dropdown-item text-primary fw-bold" href="#">{cat.category}</a>                                      
                                    </li>
                                ))}
                            </ul>


                            {/* Overlay 背景遮罩*/}
                            {showMenu && (
                                <div 
                                    className="position-fixed top-0 start-0 w-100 h-100 d-block d-md-none"
                                style={{ 
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                    zIndex: 1040 
                                }}
                                onClick={() => setShowMenu(false)}
                                />
                            )}

                            {/* Sidebar 固定側邊選單 - Mobile */}
                            <div 
                                className={`menu-container bg-white d-md-none ${showMenu ? 'd-block' : 'd-none'}`}
                                style={{ 
                                zIndex: 1050,
                                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                                overflowY: 'auto'
                                }}
                            >
                                <div className="p-3">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className='border-bottom border-primary'>
                                            <button 
                                                className="btn btn-link text-decoration-none w-100 text-start text-primary fw-bold d-flex justify-content-between align-items-center py-3 px-0 sidebar-hover"
                                            >
                                                {cat.category}
                                                <span><ChevronRight size={24} /></span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navbar 類別導覽列 */}
                        <ul className='d-flex flex-nowrap overflow-scroll hide-scrollbar justify-content-between align-items-center p-0 mb-0 list-unstyled gap-md-8 mx-md-8'>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">生活用品</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">食品飲料</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">美妝保養</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">數位家電</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">嬰幼兒</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">寵物</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">室內居家</a></li>
                            <li className="category-text-btn"><a href="#" className="py-3 px-4 category-link">品牌服飾</a></li>
                        </ul>                       
                    </div>   
                </div>          
            </div>
            {/* 關鍵class:
            d-flex: 讓子元素橫向排列
            flex-nowrap: 禁止換行，強制在同一行
            overflow-auto: 當內容溢出時顯示滾動機制
            hide-scrollbar: 自定義的 CSS class，用來隱藏 X 軸
            */}


            {/* Hero swiper輪播圖 */} 
            <section className="hero">
                <HeroSwiper />
            </section>

            {/* Flash sale 限時搶購 */}
            <section className="flash-sale bg-primary-900 p-0">
                <div className="container py-7 py-md-120">
                    <h4 className="text-primary-200 fw-bold sales-pitch mb-1 mb-md-3">HURRY UP !</h4>
                    <div className="d-flex justify-content-between align-items-center mb-7">
                        <h2 className='title-line text-white fw-bold'>限時搶購</h2>
                        {/* Horizontal Line (Flex Grow to fill space) */}
                        <div className="flex-grow-1 bg-primary-100" style={{ height: '1px' }}></div>
                    </div>                    
                    <div>
                        <CardSwiper />
                    </div>                    
                </div>
            </section>

            {/* Best-sellers 熱銷商品 & member-only會員專屬優惠 */}
            <section className="bg-white p-0">
                <div className="container py-120">
                    <div className="row">
                        <div className="col-12 mb-10">
                            <div className="w-100 mb-8">
                                <h4 className="text-primary fw-bold sales-pitch mb-1 mb-md-3">HOT</h4>
                                <div className="d-flex justify-content-between align-items-center mb-7">
                                    <h2 className="title-line text-black fw-bold bg-white">熱銷商品</h2>
                                    {/* Horizontal Line (Flex Grow to fill space) */}
                                    <div className="flex-grow-1 mx-4 bg-primary" style={{ height: '1px' }}></div>                                               
                                    <div><Link to="/" className="btn btn-border-primary rounded-pill view-more-btn py-3 px-5 py-md-4 px-md-7 fw-bold">查看更多</Link>
                                    </div>
                                </div>                   
                                <div>
                                    <GreyCardSwiper />
                                </div>
                            </div>
                            <div className="w-100">
                                <h4 className="text-primary fw-bold sales-pitch mb-1 mb-md-3">MEMBER ONLY</h4>
                                <div className="d-flex justify-content-between align-items-center mb-7">
                                    <h2 className="title-line text-black fw-bold bg-white">會員專屬優惠</h2>
                                    {/* Horizontal Line (Flex Grow to fill space) */}
                                    <div className="flex-grow-1 mx-4 bg-primary" style={{ height: '1px' }}></div>                                               
                                    <div><Link to="/" className="btn btn-border-primary rounded-pill view-more-btn py-3 px-5 py-md-4 px-md-7 fw-bold">查看更多</Link>
                                    </div>
                                </div>                   
                                <div>
                                    <GreyCardSwiper />
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </section>

            
            {/* Promo 精選推薦 */}
            <section className='bg-primary-50 p-0'>
                <div className="container py-120 d-flex flex-column">

                    {/* 寵物用品 */}
                    <div className='mb-6 mb-md-8'>
                        <div className="bg-white d-flex justify-content-between align-items-center mb-7">
                            <div className='d-flex align-items-center m-0'>
                                <div className='bg-primary px-2 py-5 p-md-4 text-white me-2 me-md-4'>
                                    <Cat className='title-icon' />
                                </div>
                                <div className="d-flex flex-column-reverse align-items-center flex-md-row py-3 py-md-0">
                                    <h2 className='me-md-3 mb-0'>寵物用品</h2>
                                    <div className="badge promo-badge rounded-pill bg-primary-100 py-1 px-3 py-md-2 px-md-4 mb-1 mb-md-0 text-primary fw-bold">精選推薦</div>
                                </div>
                            </div>
                            <div><Link to="/" className="btn btn-border-primary rounded-pill view-more-btn py-3 px-5 py-md-4 px-md-7 fw-bold me-4">查看更多</Link>
                            </div>
                        </div>
                                        
                        <div className="row bg-primar-50 d-flex flex-column flex-md-row">
                            {/* 左側商品宣傳圖 */}
                            <div className="col-12 col-md-4 border-4 px-md-0 mb-3 mb-md-0">
                                <img src={`${import.meta.env.BASE_URL}images/promo-pet.svg`} alt="pet-supplies" className='promo-img h-100'/>
                            </div>
                            {/* <div className="col-12 col-md-4 px-md-0">
                                <div className="border-4 mb-3 mb-md-0">
                                    <img src={`${import.meta.env.BASE_URL}images/promo-pet.svg`} alt="pet-supplies" className='promo-img h-100'/>
                                </div>
                            </div> */}
                            {/* 右側網格卡片輪播 */}
                            <div className="col-12 col-md-8">                           
                                <CardCarousel />                            
                            </div>                        
                        </div>
                    </div>


                    {/* 食品飲料 */}
                    <div>
                        <div className="bg-white d-flex justify-content-between align-items-center mb-7">
                            <div className='d-flex align-items-center m-0'>
                                <div className='bg-primary px-2 py-5 p-md-4 text-white me-2 me-md-4'>
                                    <CookingPot className='title-icon' />
                                </div>
                                <div className="d-flex flex-column-reverse align-items-center flex-md-row py-3 py-md-0">
                                    <h2 className='me-md-3 mb-0'>食品飲料</h2>
                                    <div className="badge promo-badge rounded-pill bg-primary-100 py-1 px-3 py-md-2 px-md-4 mb-1 mb-md-0 text-primary fw-bold">精選推薦</div>
                                </div>
                            </div>
                            <div><Link to="/" className="btn btn-border-primary rounded-pill view-more-btn py-3 px-5 py-md-4 px-md-7 fs-sm fs-md-5 fw-bold me-4">查看更多</Link>
                            </div>
                        </div>
                                        
                        <div className="row bg-primar-50">
                            <div className="col-12 col-md-4 border-4 px-md-0 mb-3 mb-md-0">
                                <img src={`${import.meta.env.BASE_URL}images/promo-food.svg`} alt="pet-supplies" className='promo-img'/>
                            </div>
                            {/* 網格卡片輪播 */}
                            <div className="col-12 col-md-8">                           
                                <CardCarousel />                            
                            </div>                        
                        </div>
                    </div>

                </div>
            </section>

            <BackToTop />
        </>
    )
}