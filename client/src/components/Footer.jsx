import { Link } from "react-router-dom"
import { Mail, Phone, ArrowUp } from "lucide-react"

export default function Footer() {
    return (
        <div className="footer bg-gray-900 py-80">
            <div className="footer-info container d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 mb-md-5">
                <Link to="/">
                    <img src="./images/zonama-logo-lg.svg" alt="logo" className="mb-5 mb-md-0" />
                </Link>                
                <div className="row">
                    <div className="footer-text col-12 d-flex justify-content-center">
                        <ul className="col-6 text-white text-decoration-none list-unstyled">
                            <li><a href="#">關於我們</a></li>
                            <li><a href="#">投資與贊助</a></li>
                            <li><a href="#">使用者條款</a></li>
                            <li><a href="#">退換貨政策</a></li>
                        </ul>
                        <ul className="footer-text-right col-6 text-white text-decoration-none list-unstyled">
                            <li><a href="#">顧客隱私權​政策</a></li>
                            <li><a href="#">安心​購物​</a></li> 
                            <li><a href="#">資訊​安全​及​隱私保護​認證</a></li>  
                            <li><a href="#">成為賣​家</a></li>
                        </ul>    
                    </div>                   
                </div>                
            </div>

            {/* 水平線 */}
            <div className="container flex-grow-1 bg-white mb-3 mb-md-5" style={{ height: '1px' }}></div>
            
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center text-white p-md-0">
                <p>新北市永和區秀朗路一段12巷1弄128號</p>
                <div className="d-flex flex-column flex-md-row">
                    <p className="mb-3 mb-md-0 me-md-5"><span className="me-3"><Mail size={24} /></span>zonama.ecTW@eshop.io</p>
                    <p><span className="me-3"><Phone size={24} /></span>02-1888-2878 #9</p>
                </div>
            </div>

            <button className="btn rounded-circle back-to-top-btn border-none">
                <a href="#nav-top" className="back-to-top"><ArrowUp size={40} /></a>              
            </button>           
        </div>
    )
}