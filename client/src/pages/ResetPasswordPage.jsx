import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import axiosClient from "../api/axiosClient";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        reset_code: '',
        new_password: '',
        confirm_new_password: '',
    });
    const [err, setErr] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const userEmail = location.state?.email;

    useEffect(() => {
        if (userEmail) {
            console.log(`從重設密碼頁面收到email: ${userEmail}`);
        } else {
            console.log('未收到重設驗證碼email');
        }
    }, [userEmail]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (formData.new_password !== formData.confirm_new_password) {
            console.log('密碼不一致');
            alert('密碼不一致，請重新輸入');  
            return;
        }

        setIsLoading(true);

        try {
            await axiosClient.post('/reset-password', {
                email: userEmail,
                code: formData.reset_code,
                newPassword: formData.new_password
            });

            console.log('密碼重設成功')
            alert('密碼重設成功! 請登入會員');
            setTimeout(() => { navigate('/login') }, 1500);

        } catch (error) {
            console.log('密碼重設失敗', error.response?.data?.message);
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
                                    <div className="text-center mt-4 mb-5">
                                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                            <Lock size={48} className="text-primary" />
                                        </div>
                                        <h2 className="text-primary-950 fw-bold mb-2">重設密碼</h2>
                                        <p className="text-primary">請輸入驗證碼及新密碼</p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold text-primary-700">重設驗證碼 (7碼)</label>
                                            <input
                                            type="text"
                                            name="reset_code"
                                            value={formData.reset_code}
                                            onChange={handleInputChange}
                                            className="form-control form-control-lg text-center fw-semibold"
                                            placeholder="輸入 7 碼驗證碼"
                                            maxLength="7"
                                            style={{ letterSpacing: '0.3rem' }}
                                            disabled={isLoading}
                                            required
                                            autoComplete="password"
                                            />
                                            <small className="text-muted d-block text-center mt-1">
                                            重設驗證碼已發送至 {userEmail}
                                            </small>
                                        </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-primary-700">新密碼</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-white border-end-0">
                                                <Lock size={20} className="text-gray-400 ms-1" />
                                            </span>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="new_password"
                                                value={formData.new_password}
                                                onChange={handleInputChange}
                                                className="form-control border-start-0 border-end-0 ps-2 py-3"
                                                placeholder="至少 6 個字元"
                                                disabled={isLoading}
                                                required
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="btn bg-white border border-start-0 text-gray-400 text-align-center"
                                                disabled={isLoading}
                                            >
                                                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="form-label fw-semibold text-primary-700">確認新密碼</label>
                                        <div className="input-group mb-3">
                                        <span className="input-group-text bg-white border-end-0">
                                            <Lock size={20} className="text-gray-400 ms-1" />
                                        </span>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirm_new_password"
                                            value={formData.confirm_new_password}
                                            onChange={handleInputChange}
                                            className="form-control border-start-0 ps-2 py-3"
                                            placeholder="再次輸入新密碼"
                                            disabled={isLoading}
                                            required
                                            autoComplete="new-password"        
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="btn bg-white border border-start-0 text-gray-400 text-align-center"
                                            disabled={isLoading}
                                        >
                                            {!showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                        </div>
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
                                            重設中...
                                        </>
                                        ) : '重設密碼'}
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