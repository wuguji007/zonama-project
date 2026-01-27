import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, ShoppingCart, CircleX, CircleUser } from "lucide-react"


export default function NavBar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  }

  const SearchBar = () => {
      const [query, setQuery] = useState('');
      const [isFocused, setIsFocused] = useState(false);

      const handleClear = () => {
          setQuery('');
      };
    
    return (
      <>
        {/* Search - 平板電腦顯示 */}
        <div className="nav-search container-fluid d-none d-md-block" style={{ maxWidth: '700px' }}>
          <div
            className={`
              d-flex align-items-center w-100 px-4 py-2 rounded-1 border border-1 bg-white
              ${isFocused ? 'shadow border-transparent' : 'shadow-sm border-light'}
            `}
            style={{
              height: '48px',
              transition: 'box-shadow 0.2s ease-in-out',
              borderColor: isFocused ? 'transparent' : '#dfe1e5' // Google 預設邊框色
            }}
          >
            {/* Search Icon */}
            <div className="d-flex align-items-center justify-content-center text-primary me-3">
              <Search size={20} />
            </div>
            
            {/* Input Field */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="搜尋想要的商品"
              className="flex-grow-1 border-0 bg-transparent text-dark"
              style={{ 
                outline: 'none', 
                fontSize: '16px',
                boxShadow: 'none' // 移除 Bootstrap input 預設 focus 效果
              }}
            />

            {/* Right Side Icon (Clear) */}
            <div className="d-flex align-items-center ms-2">
              {/* Clear Button */}
              {query && (
                <button
                  onClick={handleClear}
                  className="btn btn-link text-secondary p-1 d-flex align-items-center text-decoration-none rounded-circle"
                  style={{ width: '32px', height: '32px' }}
                  aria-label="清除"
                >
                  <CircleX size={22} />
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  // Search for mobile
  const SearchBarMobile = () => {
      const [query, setQuery] = useState('');
      const [isFocused, setIsFocused] = useState(false);

      const handleClear = () => {
          setQuery('');
      };
    
    return (
      <>
        {/* 手機版 */}
        <div className="nav-search container-fluid w-100 d-block d-md-none px-0">
          <div
            className={`
              d-flex align-items-center w-100 px-4 py-2 rounded-1 border border-1 bg-white
              ${isFocused ? 'shadow border-transparent' : 'shadow-sm border-light'}
            `}
            style={{
              height: '48px',
              transition: 'box-shadow 0.2s ease-in-out',
              borderColor: isFocused ? 'transparent' : '#dfe1e5' // Google 預設邊框色
            }}
          >
            {/* Search Icon */}
            <div className="d-flex align-items-center justify-content-center text-primary me-3">
              <Search size={20} />
            </div>
            
            {/* Input Field */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="搜尋想要的商品"
              className="flex-grow-1 border-0 bg-transparent text-dark"
              style={{ 
                outline: 'none', 
                fontSize: '16px',
                boxShadow: 'none' // 移除 Bootstrap input 預設 focus 效果
              }}
            />

            {/* Right Side Icon (Clear) */}
            <div className="d-flex align-items-center ms-2">
              {/* Clear Button */}
              {query && (
                <button
                  onClick={handleClear}
                  className="btn btn-link text-secondary p-1 d-flex align-items-center text-decoration-none rounded-circle"
                  style={{ width: '32px', height: '32px' }}
                  aria-label="清除"
                >
                  <CircleX size={22} />
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  //User會員選單
  const UserMenu = () => {
    return (
      <>
        <div className="nav-user btn-group ms-2 ms-md-3 flex-shrink-md-0">
          <button
            type="button"
            className="btn p-0 border-0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* 手機版 */}
            <Link className="nav-link nav-link-cart p-2 rounded-circletext-primary d-block d-md-none" to="/member-center">
              <CircleUser size={24} />
            </Link>
            {/* 平板電腦 */}
            <Link className="nav-link nav-link-cart p-2 rounded-circle text-primary d-none d-md-block" to="/member-center">
              <CircleUser size={36} />
            </Link>
          </button>

          <ul className="dropdown-menu rounded-1 py-7 px-4 p-md-2">
            <li className='py-3 rounded-1'>
              <button
                type="button"
                className="dropdown-item text-primary fw-bold"
                onClick={() => navigate('/member-center')}
              >
                會員中心
              </button>
              {/* <a className="dropdown-item text-primary fw-bold" href="#">會員中心</a>                                       */}
            </li>
            <li className='py-3 rounded-1'>
              <button
                type="button"
                className="dropdown-item text-primary fw-bold"
                onClick={handleLogoutClick}
              >
                登出
              </button>
            </li>
          </ul>
        </div>
      </>
    )
  };


    
  return (
    <>
      {/* 導覽列 */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-0 pb-0 mt-4 mb-2">
        <div className="container">
          <div className="container-fluid d-flex flex-column px-md-0">
            <div className="d-flex justify-content-between align-items-center py-0">
              
              {/* LOGO-手機版顯示 */}
              <Link className="navbar-brand py-2 my-0 d-block d-md-none" to="/">
                  <img src="./images/zonama-logo-sm.svg" alt="logo" />
              </Link>
              {/* LOGO-平板電腦顯示 */}
              <Link className="navbar-brand w-240 h-62 p-0 my-0 me-0 d-none d-md-block" to="/">
                  <img src="./images/zonama-logo.svg" alt="logo" />
              </Link>

            
              {/* 搜尋欄 */}
              <SearchBar />

              
              <div className="d-flex justify-content-between align-items-center py-0">                 
                {/* 購物車 */}
                <div className="nav-cart">
                  <button className="btn p-0">
                      {/* 手機版 */}
                      <Link className="nav-link nav-link-cart p-2 rounded-circletext-primary d-block d-md-none" to="/cart">
                          <ShoppingCart size={24} />
                      </Link>
                      {/* 平板電腦 */}
                      <Link className="nav-link nav-link-cart p-2 rounded-circle text-primary d-none d-md-block" to="/cart">
                          <ShoppingCart size={36} />
                      </Link>                                        
                  </button>
                </div>

                
                {/* 登入/註冊 */} 
                {!isLoggedIn ? (
                    <>
                      <div className="ms-2 ms-md-3 flex-shrink-md-0">
                        <button className="loggin-btn btn border-primary rounded-pill p-0">
                            <Link className="nav-link rounded-pill fw-bold py-3 px-5 py-lg-4 px-lg-7" to="/login">登入/註冊</Link>
                        </button>
                  </div>
                  </>) : <UserMenu />
                }                       
              </div>
              
            </div>
             
              
            {/* 搜尋欄-手機版 */}
            <div className="container-fluid px-0 py-2">
              <SearchBarMobile />
            </div>
              
          </div>                               
        </div>
      </nav>
    </>
  )
}