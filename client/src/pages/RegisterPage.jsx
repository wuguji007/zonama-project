import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShoppingCart, User, ArrowLeft, Loader } from 'lucide-react';

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="register-panel h-100 bg-light d-flex justify-content-center align-items-center py-5 py-md-8">
                <div className="container">
                    <div className="row justify-content-center mb-6">
                        <div className="col-md-6 col-lg-5">
                            <button
                            // onClick={() => setCurrentPage('home')}
                            className="btn btn-link text-decoration-none text-secondary mb-4 p-0"
                            >                            
                            <Link to="/"><ArrowLeft size={20} className="me-2" />返回首頁</Link> 
                            </button>
                            
                            <div className="card shadow-lg border-0 h-auto">
                                <div className="card-body p-4 p-md-5">
                                    <div className="text-center my-4">
                                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                            <User size={48} className="text-primary" />
                                        </div>
                                        <h2 className="text-primary-950 fw-bold mb-2">會員註冊</h2>
                                        <p className="text-primary">建立您的專屬帳號</p>
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-primary-700">電子信箱</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0">
                                                    <Mail size={20} className="text-gray-400 ms-1" />
                                                </span>
                                                <input
                                                    // type="email"
                                                    // name="email"
                                                    // value={formData.email}
                                                    // onChange={handleInputChange}
                                                    className="form-control border-start-0 ps-2 py-3"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-primary-700">密碼</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0">
                                                    <Lock size={20} className="text-gray-400 ms-1" />
                                                </span>
                                                <input
                                                    // type={showPassword ? 'text' : 'password'}
                                                    // name="password"
                                                    // value={formData.password}
                                                    // onChange={handleInputChange}
                                                    className="form-control border-start-0 border-end-0 ps-2 py-3"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="btn bg-white border border-start-0 text-gray-400 text-align-center"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <label className="form-label fw-semibold text-primary-700">確認密碼</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0">
                                                    <Lock size={20} className="text-gray-400 ms-1" />
                                                </span>
                                                <input
                                                    // type={showPassword ? 'text' : 'password'}
                                                    // name="confirmPassword"
                                                    // value={formData.confirmPassword}
                                                    // onChange={handleInputChange}
                                                    className="form-control border-start-0 ps-2 py-3"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCheckPassword(!showCheckPassword)}
                                                    className="btn bg-white border border-start-0 text-gray-400 text-align-center"
                                                >
                                                    {showCheckPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* {message.text && (
                                            <div className={`alert alert-${message.type} d-flex align-items-center`} role="alert">
                                            <span className="me-2">{message.type === 'danger' ? '⚠️' : '✅'}</span>
                                            <div>{message.text}</div>
                                            </div>
                                        )} */}

                                        <button
                                            // onClick={handleRegister}
                                            // disabled={isLoading}
                                            className="btn btn-primary w-100 py-3 fw-semibold"
                                        >
                                            {isLoading ? (
                                            <><Loader size={20} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />處理中...</>
                                            ) : '註冊帳號'}
                                        </button>
                                    </div>

                                    <div className="d-flex justify-content-center align-items-center text-center mt-4">
                                        <span className="text-muted me-2">已有帳號? </span>
                                        <button
                                            // onClick={() => setCurrentPage('login')}
                                            className="btn btn-link text-decoration-none fw-bold p-0"
                                        >
                                            <Link to="/login">立即登入</Link> 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}