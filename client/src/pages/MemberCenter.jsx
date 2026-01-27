import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MemberCenter({ user }) {
    const locaiton = useLocation();

    const isUser = locaiton.state?.user || user;

    return (
        <>
            <div className='h-100 bg-light d-flex justify-content-center align-items-center py-5 py-md-8' style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }} >
                <div className="container">
                    <div className="card shadow">
                    <div className="card-header bg-primary text-white">會員中心</div>
                    <div className="card-body">
                        <h3>歡迎回來, {user?.username}</h3>
                        <p>Email: {user?.email}</p>
                        <p>這是只有登入會員才能看到的頁面。</p>
                    </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}