import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, CircleUserRound, User, ArrowLeft, Loader } from 'lucide-react';


export default function Register({setVerificationEmail}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({}); // 錯誤狀態
    const [passwordStrength, setPasswordStrength] = useState({ level: 0, text: '', color: '' }); // 密碼強度
    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        setMessage({ type: '', text: '' });
    }
        

    //註冊帳號
    const handleSubmit = async (e) => {
        e.preventDefault();

        //使用者名稱不得大於40個字元
        // if (formData.username.length > 40) {
        //     setMessage({ type: 'danger', text: '名稱字數過長' });
        //     return;
        // }

        // //密碼長度小於6位數字
        // if (formData.password.length < 6) {
        //     setMessage({ type: 'danger', text: '密碼至少需要 6 個字元' });
        //     return;
        // }
        // //密碼不一致
        // if (formData.password !== formData.confirmPassword) {
        //     setMessage({ type: 'danger', text: '密碼不一致' });
        //     return;
        // }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        console.log('前端準備發送註冊資料:', formData); 
        try {
            
            const res = await axiosClient.post('/register', { email: formData.email, password: formData.password, username: formData.username });
            setVerificationEmail(formData.email);

            console.log('註冊成功！驗證碼已發送至您的信箱', res.data);
            
            // 導向驗證頁面，並透過 state 傳遞 email
            setTimeout(() => navigate('/verify', { state: { email: formData.email } }), 1500);

        } catch (error) {
            console.log(error.response?.data?.message || '註冊失敗');
        };
    }

    return (
        <>
            <div className="register-panel h-100 bg-light d-flex justify-content-center align-items-center py-5 py-md-8">
                <div className="container">
                    <div className="row justify-content-center mb-6">
                        <div className="col-md-6 col-lg-5">
                            <button
                            onClick={() => navigate('/')}
                            className="btn btn-link text-decoration-none text-secondary mb-4 p-0"
                            >                            
                            <ArrowLeft size={20} className="me-2" />
                            返回首頁 
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

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-primary-700">使用者名稱</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0">
                                                    <CircleUserRound size={20} className="text-gray-400 ms-1" />
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="form-control border-start-0 ps-2 py-3"
                                                    placeholder="輸入您的名稱"
                                                    disabled={isLoading}
                                                    required
                                                    autoComplete='username'
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-primary-700">電子信箱</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0">
                                                    <Mail size={20} className="text-gray-400 ms-1" />
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="form-control border-start-0 ps-2 py-3"
                                                    placeholder="your@email.com"
                                                    disabled={isLoading}
                                                    required
                                                    autoComplete='email'
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
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="form-control border-start-0 border-end-0 ps-2 py-3"
                                                    placeholder={message.type === 'danger' ? `${message.text}` : "••••••••"}
                                                    disabled={isLoading}
                                                    required
                                                    autoComplete='new-password'
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="btn bg-white border border-start-0 text-gray-400 text-align-center"
                                                >
                                                    {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                                                    type={showCheckPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="form-control border-start-0 ps-2 py-3"
                                                    placeholder={ message.type === 'danger' ? `${message.text}` : "••••••••"}
                                                    disabled={isLoading}
                                                    required
                                                    autoComplete='new-password'
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCheckPassword(!showCheckPassword)}
                                                    className="btn bg-white border border-start-0 text-gray-400 text-align-center"
                                                >
                                                    {!showCheckPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                                            type='submit'
                                            disabled={isLoading}
                                            className="btn btn-primary w-100 py-3 fw-semibold"
                                        >
                                            {isLoading ? (
                                            <><Loader size={20} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />處理中...</>
                                            ) : '註冊帳號'}
                                        </button>
                                    </form>

                                    <div className="d-flex justify-content-center align-items-center text-center mt-4">
                                        <span className="text-muted me-2">已有帳號? </span>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="btn btn-link text-decoration-none fw-bold p-0"
                                        >
                                            立即登入
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