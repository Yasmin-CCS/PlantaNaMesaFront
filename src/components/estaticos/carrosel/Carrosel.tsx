import { Box, Grid } from "@material-ui/core";
import './Carrosel.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";




function Carrosel() {
    return (
        <>
    <Grid className="espaso">
    <Swiper
         spaceBetween={0}
         centeredSlides={true}
         autoplay={{
           delay: 4000,
           disableOnInteraction: false,
         }}
         pagination={{
           clickable: true,
         }}
         navigation={true}
         modules={[Autoplay, Pagination, Navigation]}
         className="mySwiper"
      >

       <SwiperSlide data-hash="slide1"><img src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80" alt="" /></SwiperSlide>
        <SwiperSlide data-hash="slide2"><img src="https://images.unsplash.com/photo-1485795046599-702122cd1267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" /></SwiperSlide>

        <SwiperSlide data-hash="slide3"><img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" /></SwiperSlide>

        <SwiperSlide data-hash="slide4"><img src="https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" /></SwiperSlide>

        <SwiperSlide data-hash="slide5"><img src="https://plus.unsplash.com/premium_photo-1663852297801-d277b7af6594?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" /></SwiperSlide>

      </Swiper>
    </Grid>
        </>
    );
}
export default Carrosel;

