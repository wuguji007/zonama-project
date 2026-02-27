import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircleCheckBig, ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext'; // 引入 useCart

export default function CheckoutPage({ formData, setFormData, merchantOrderNo, setOrderData, onReset }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart(); // 取得清空購物車方法
    
    // 防呆保護：如果沒有資料，給予預設值避免崩潰
    const getOrderData = location.state?.orderData || { subtotal: 0, shippingFee: 0, total: 0 };
    const { items, shippingFee, subtotal, total, CreatedAt } = getOrderData;
    // console.log(items, shippingFee, subtotal, total, CreatedAt);

    const paidAt = new Date();
    // const [finalOrder, setFinalOrder] = useState({});
    
    // useEffect(() => {
    //     if (getOrderData) {
    //         setFinalOrder({
    //             ...getOrderData,
    //             paidAt: new Date().toISOString()
    //         });
    //     }
    //     console.log(finalOrder);
    // }, [getOrderData]); // 只有當訂單資料變動時才更新

    const finalOrderData = {
        ...getOrderData,
        orderNo: merchantOrderNo,
        paidAt: new Date().toISOString(),
        status: 'PAID',
        receiverName: formData.receiverName, // 確保formData被帶走
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        shippingFee: shippingFee
    };

    
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setTimeout(() => {
                setIsSubmitting(false);
                //暫時將訂單內容存入localStorage，讓會員中心可以使用

                // 先取出舊的訂單清單（如果沒有就給空陣列）
                const existingOrders = JSON.parse(localStorage.getItem('all_orders')) || [];
            
                // 將當前新訂單加入陣列的最前面
                const updatedOrders = [finalOrderData, ...existingOrders];

                // 將整個陣列存回 localStorage (使用新的 Key: 'all_orders')
                localStorage.setItem('all_orders', JSON.stringify(updatedOrders));


                // localStorage.setItem('order', JSON.stringify(finalOrderData));
                setOrderData(finalOrderData);
                console.log(finalOrderData);
                onReset();
                // clearCart(); // 結帳成功，清空購物車
                navigate('/payment-complete', { state: { getOrderData, orderFinal: finalOrderData, purchaseInfo: formData } });
            }, 1500);
        } catch (err) {
            setIsSubmitting(false);
        }
    };

    return (
        <>
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
                        <div className="step active">
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
        
            <div className="checkout-panel h-100 bg-gray-50 d-flex justify-content-center align-items-center py-5 py-md-7">
                <div className='container'>
                    <button className="btn btn-link text-secondary mb-3 text-decoration-none d-flex align-items-center" onClick={() => navigate('/cart')}>
                        <ArrowLeft size={20} className='me-2' /> 返回購物車
                    </button>
                    <div className="row">
                        <div className="col col-lg-8 mb-4 mb-md-0">
                            <div className="bg-white border border-gray-200 rounded-4 d-flex flex-column py-4 py-md-6 h-100">
                                <form onSubmit={handleSubmit}>
                                    <h5 className="text-primary fw-bold px-4 px-md-6 mb-4">收件人資訊</h5>
                                    <div className='border-top border-gray-100 px-4 px-md-6'>                                    
                                        <div className="form-row d-flex justify-content-between gap-4 pt-4">
                                            <div className="form-group col-md-5 mb-3 mb-md-4">
                                                <label className="small font-weight-bold text-muted mb-2">收件姓名</label>
                                                <input required className="form-control py-2" value={formData.receiverName.toLocaleString()} onChange={e => setFormData({ ...formData, receiverName: e.target.value })} placeholder="請輸入姓名" />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label className="small font-weight-bold text-muted mb-2">連絡電話</label>
                                                <input required className="form-control py-2" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="0912-345-678" />
                                            </div>
                                        </div>
                                        <div className="form-group mb-md-4 mb-3">
                                            <label className="small font-weight-bold text-muted mb-2">電子信箱</label>
                                            <input required type="email" className="form-control py-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="接收訂單通知" />
                                        </div>
                                        <div className="form-group mb-md-4">
                                            <label className="small font-weight-bold text-muted mb-2">收件地址</label>
                                            <input required className="form-control py-2" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="街道、門牌、樓層" />
                                        </div>
                                    </div>

                                    <div className="bg-gray-800 text-white p-6 mt-6 mx-4 mx-md-6 mb-4 border-0 rounded-4 rounded shadow">
                                        <div className="d-flex flex-column flex-md-row align-items-start justify-content-md-between align-items-md-center">
                                            <div className='mb-5 mb-md-0'>
                                                <p className="small mb-1 opacity-75">訂單編號</p>
                                                <code className="text-light small">{merchantOrderNo}</code>
                                            </div>
                                            <div className="text-right">
                                                <p className="small mb-1 opacity-75">應付總額</p>
                                                {/* ✨ 安全讀取 */}
                                                <h3 className="font-weight-bold mb-0 text-info">NT${getOrderData.total?.toLocaleString()}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <button type="submit" className="btn btn-primary btn-block btn-lg mt-4 p-4 fw-semibold fs-6 fs-md-2 shadow-sm rounded-4" disabled={isSubmitting} >
                                                {isSubmitting ? (
                                                    <><Loader2 className="spinner-border spinner-border-sm mr-2 me-3" />金流加密安全連接中...</>
                                                ) : (
                                                    <><CreditCard className="mr-2 me-3" size={24} />確認支付並結帳</>
                                                )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* 右欄 */}
                        <div className="col col-lg-4 mb-4">
                            <div className="bg-white rounded-4 h-auto border border-gray-200 py-4 py-md-6">                      
                                <h6 className="fw-bold text-primary-900 px-4 mb-4">本次結帳明細</h6>                      
                                <div className="border-top border-gray-100 py-4">
                                    <div className="d-flex justify-content-between px-4 mb-4 small text-muted">
                                        <span>商品小計</span><span>NT${getOrderData.subtotal?.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between px-4 small text-muted"><span>物流費用</span>
                                        <span>{getOrderData.shippingFee === 0 ? '免費' : `NT$${getOrderData.shippingFee}`}</span>
                                    </div>                           
                                </div>
                                <div className="d-flex justify-content-between border-top border-gray-100 pt-4 fw-semibold h5 mb-0 text-primary">
                                    <span className='px-4'>應付總額</span>
                                    <span className="fw-bold px-4">NT${getOrderData.total?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>            
    );
};