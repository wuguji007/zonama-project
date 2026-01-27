import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import axiosClient from "../api/axiosClient";


export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await axiosClient.post('/forgot-password', { email });
            console.log('重設驗證碼已寄出');

            setTimeout(() => {
                navigate('/reset-password', { state: { email } });
            }, 1500);
            
        } catch (error) {
            console.log('重設驗證碼發送失敗:', error.response?.data?.message);
        }
    }


    return (
        <>
            <div className="h-100 bg-light d-flex justify-content-center align-items-center py-5 py-md-8" 
            style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <div className="container">
                    <div className="row justify-content-center mb-6">
                        <div className="col-md-6 col-lg-5">
                            
                            <button
                            onClick={() => navigate('/login')}
                            className="btn btn-link text-decoration-none text-secondary mb-4 p-0"
                            >
                            <ArrowLeft size={20} className="me-2" />
                            返回登入
                            </button>
                            
                            <div className="card shadow-lg border-0 h-auto">
                                <div className="card-body p-4 p-md-5">
                                    <div className="text-center my-4">
                                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                            <Lock size={48} className="text-primary" />
                                        </div>
                                        <h2 className="text-primary-950 fw-bold mb-2">忘記密碼</h2>
                                        <p className="text-primary">請輸入您的註冊信箱</p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-6">
                                            <label className="form-label fw-semibold text-primary-700">電子信箱</label>
                                            <div className="input-group mb-3">
                                            <span className="input-group-text bg-white border-end-0">
                                                <Mail size={20} className="text-gray-400 ms-1" />
                                            </span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control border-start-0 ps-2 py-3"
                                                placeholder="your@email.com"
                                                disabled={isLoading}
                                                required
                                                autoComplete="email"
                                            />
                                            </div>
                                            <small className="danger text-danger">
                                            我們將發送 7 碼重設驗證碼到您的信箱
                                            </small>
                                        </div>

                                        {/* {message.text && (
                                            <div className={`alert alert-${message.type} d-flex align-items-center mb-3`}>
                                            <span className="me-2">{message.type === 'danger' ? '⚠️' : '✅'}</span>
                                            <div>{message.text}</div>
                                            </div>
                                        )} */}

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn btn-primary w-100 py-3 fw-semibold mb-6"
                                        >
                                            {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                發送中...
                                            </>
                                            ) : '發送重設碼'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}