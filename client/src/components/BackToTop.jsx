import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    // --- 狀態管理：控制按鈕是否顯示 ---
    const [showBackToTop, setShowBackToTop] = useState(false);
  
    useEffect(() => {

        const link = document.createElement('link');
        document.head.appendChild(link);

        const handleResize = () => setWindowWidth(window.innerWidth);

        // --- 捲動偵測邏輯 ---
        const handleScroll = () => {
            // 當捲動超過 300px 時顯示按鈕，否則隱藏
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('resize', handleResize);
        // 加入捲動監聽器
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.head.removeChild(link);
            window.removeEventListener('resize', handleResize);
            // 清除捲動監聽器
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // --- 點擊行為：平滑捲動回頂部 ---
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 使用平滑捲動效果
        });
    };

    return (
        <>
            {/* --- 按鈕元件 --- */}
            <button 
                className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`} 
                onClick={scrollToTop}
                aria-label="Back to Top"
            >
                <ArrowUp size={40} />
            </button>
        </>       
    )
}