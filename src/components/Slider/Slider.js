import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './Slider.module.scss';

function Slider() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={2}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={true}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className={styles.swiper}
            >
               <SwiperSlide className={styles.slide}>
                   <img src="img/slides/slide1.webp" alt='slider'/>
               </SwiperSlide>


                <SwiperSlide className={styles.slide}>
                    <img src="img/slides/slide3.webp" alt='slider'/>
                </SwiperSlide >
                <SwiperSlide className={styles.slide}>
                    <img src="img/slides/slide5.webp" alt='slider'/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <img src="img/slides/slide6.webp" alt='slider' />
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default Slider;