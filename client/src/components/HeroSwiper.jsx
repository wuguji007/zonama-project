import { useState } from 'react';
import { getImageUrl } from '../utils/imageHelper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


export default function SwiperTemplate() {
    const [carouselData] = useState([
        {
            id: 1,
            image: "images/swiper-1.svg",
            title: "生活家電全面折扣",
            description: "11/24-12/08 全館特價優惠",
        },
        {
            id: 2,
            image: "images/swiper-2.svg",
            title: "冬天乾肌保養大補帖",
            description: "保養品最低五折起！",
        },
        {
            id: 3,
            image: "images/swiper-3.svg",
            title: "居家裝潢修繕服務",
            description: "家用五金全面促銷中，滿千折百最划算",
        },
    ]);

    return (
        <>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {carouselData.map((item) => (
                    <SwiperSlide key={item.id} className='slide-container'>
                        <img src={`${import.meta.env.BASE_URL}${item.image}`} className="d-block w-100 slide-img" alt={`Slide ${item.id}`} />
                        <div className="container carousel-caption carousel-caption-center text-center text-md-end">
                            <h1 className='swiper-title fw-bold'>{item.title}</h1>
                            <p className='swiper-text'>{item.description}</p>
                            <button type='button' className='btn btn-border-primary rounded-pill py-3 px-5 py-md-4 px-md-7 fs-6 fs-md-5 fw-bold'>立即查看優惠</button>
                        </div>                       
                    </SwiperSlide>                    
                ))}
            </Swiper>            
        </>
    )
}
