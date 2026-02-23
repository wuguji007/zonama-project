import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, CheckCircle, CreditCard, Trash2, Plus, Minus, Tag, AlertCircle, ChevronLeft, Shield, Info, Loader2 } from 'lucide-react';


export default function PaymentCompletePage({ formData, merchantOrderNo, onReset }) {
    const navigate = useNavigate();
    const location = useLocation();
    const orderFinal = location.state?.getOrderData || null;

    useEffect(() => {
        if (orderFinal) {
            console.log(`從註冊頁收到訂單資訊: ${orderFinal}`);
            console.log(merchantOrderNo);
            console.log(formData);
        } else {
            console.log('未收到訂單資訊');
        }
    },[orderFinal])
  
    const handleGoHome = () => {
        onReset();
        navigate('/');
    };

    return (
        <div className="complete-panel h-100 bg-gray-50 d-flex justify-content-center align-items-center py-5 py-md-8">
            <div className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card h-100 border-1 border-gray-200 rounded-4 shadow p-5 p-md-7 text-center">
                            
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mx-auto p-4 mb-3" >
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="fw-bold text-primary mb-2">訂購成功！</h2>
                            <p className="small text-muted mb-5">感謝您的購買，我們已收到您的訂單</p>

                            <div className="bg-primary-50 rounded-4 p-5 text-left mb-4 border-0">
                                <div className="d-flex justify-content-between small mb-3 text-muted">
                                    <span>訂單編號</span>
                                    <span className="font-weight-bold text-dark">{merchantOrderNo}</span>
                                </div>
                                <div className="d-flex justify-content-between small mb-3 text-muted">
                                    <span>收件姓名</span>
                                    <span className="font-weight-bold text-dark">{formData.receiverName || '測試用戶'}</span>
                                </div>
                                <div className="d-flex justify-content-between small mb-3 text-muted">
                                    <span>支付總額</span>
                                    <span className="text-primary font-weight-bold h6 mb-0">NT${orderFinal.total.toLocaleString()}</span>
                                </div>
                            
                                <div className="d-flex justify-content-between small text-muted">
                                    <span>支付狀態</span>
                                    <span className="badge bg-primary px-2 py-2">付款成功</span>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block btn-lg rounded-4 py-3 mt-4 text-white fw-semibold" onClick={handleGoHome} >
                                返回首頁
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}