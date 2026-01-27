import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, CircleAlert } from 'lucide-react';
import axiosClient from '../api/axiosClient';


export default function Verify({email}) {
    const locaiton = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [isResend, setIsResend] = useState(false);

    const userEmail = locaiton.state?.email || email;

    useEffect(() => {
        if (userEmail) {
            console.log(`從註冊頁收到email: ${userEmail}`);
        } else {
            console.log('未收到註冊帳號的Email');
        }
    }, [userEmail]);

    //重發倒數計時
    useEffect((resendCooldown) => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
            return clearTimeout(timer);
        }
    },[resendCooldown])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code.length !== 6) {
            setErr('驗證碼錯誤，請重新輸入驗證碼');
            console.log('驗證碼錯誤，請輸入 6 位數驗證碼')
            return;
        }

        setIsLoading(true);

        try {
            await axiosClient.post('/verify', { email: userEmail, code: code });
            console.log('驗證成功，請前往登入')
            setTimeout(() => navigate('/login'), 1500);
            
        } catch (error) {
            console.log(err);
            setErr(error.response?.data?.message || '驗證失敗')
        }
    };

    //重新發送驗證碼
    const handleResend = async () => {        
        setIsResend(true);
        setErr('');
        setSuccessMsg('');

        try {
            await axiosClient.post('/resend-verificaiton', { email: userEmail });
            setSuccessMsg('驗證碼已重新寄出，請查收信箱');
            console.log(successMsg);
            setResendCooldown(60); // 設定 60 秒冷卻時間

        } catch (error) {
            setErr(error.response?.data?.message || "驗證碼發送失敗，請稍後再試");
            console.error(err);
        } finally {
            setIsResend(false);
        }
    }

    return (
        <>
            <div className="verify-panel h-100 bg-light d-flex justify-content-center align-items-center py-5 py-md-8" 
                style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <div className="container">
                    <div className="row justify-content-center mb-6">
                        <div className="col-md-6 col-lg-5">
                            
                            <button
                            onClick={() => navigate('/register')}
                            className="btn btn-link text-decoration-none text-secondary mb-4 p-0"
                            disabled={isLoading}
                            >
                            <ArrowLeft size={20} className="me-2" />
                            返回註冊
                            </button>
                            
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4 p-md-5">
                                    <div className="text-center my-5">
                                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3">
                                            <Mail size={56} className="text-primary" />
                                        </div>
                                        <h2 className="fw-bold text-primary-950 mb-2">驗證您的信箱</h2>
                                        <p className="text-primary small mb-2">請輸入您信箱收到的 6 位數驗證碼</p>
                                        {/* <p className="text-primary fw-semibold mb-1">{userEmail}</p>
                                        <p className="text-muted small">的 6 位數驗證碼</p> */}
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold text-center d-block">
                                                驗證碼
                                            </label>
                                            <input
                                                type="text"
                                                value={code}
                                                onChange={(e) => {
                                                    setCode(e.target.value);
                                                    setErr('');
                                                }}
                                                className="form-control form-control-lg text-center fs-2 fw-bold"
                                                placeholder="000000"
                                                maxLength="6"
                                                style={{ letterSpacing: '0.5rem' }}
                                                disabled={isLoading}
                                                autoFocus
                                                autoComplete="one-time-code"
                                                inputMode="numeric"
                                            />
                                            <small className="text-muted d-block text-center mt-2">
                                                驗證碼有效期限: 30 分鐘
                                            </small>
                                        </div>

                                        {/* {err && (
                                            <div className={`alert alert-${message.type} d-flex align-items-center mb-3`}>
                                            <span className="me-2">{message.type === 'danger' ? '⚠️' : '✅'}</span>
                                            <div>{message.text}</div>
                                            </div>
                                        )} */}

                                        <button
                                            type="submit"
                                            disabled={isLoading || code.length !== 6}
                                            className="btn btn-primary w-100 py-3 fw-semibold mb-3"
                                        >
                                            {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                驗證中...
                                            </>
                                            ) : '驗證帳號'}
                                        </button>

                                        <div className="d-flex justify-content-center align-items-center mb-6">
                                            <p className="text-secondary mb-0 me-2">沒收到驗證碼?</p>
                                            <button
                                            type="button"
                                            onClick={handleResend}
                                            disabled={isResend || resendCooldown > 0}
                                            className="btn btn-link text-decoration-none small p-0"
                                            >
                                                {resendCooldown > 0 ? `${resendCooldown}秒後重試` : (isResend ? '發送中...' : '重新發送驗證碼' )}
                                            </button>
                                        </div>
                                    </form>

                                    {/* 提示卡片 */}
                                    <div className="mt-4 alert alert-info m-0">
                                        <small>
                                            <CircleAlert size={18} className='text-danger mb-1' />
                                            <strong className='ms-2'>提示:</strong> 請檢查垃圾郵件資料夾,有時驗證碼郵件可能會被誤判。
                                        </small>
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