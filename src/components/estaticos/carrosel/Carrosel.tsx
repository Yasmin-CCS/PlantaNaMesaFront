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

          <SwiperSlide data-hash="slide1"><img src="https://mude1habito.unimedrio.com.br/wp-content/uploads/2021/11/pancs-noticia3.png" alt="" /></SwiperSlide>
          <SwiperSlide data-hash="slide2"><img src="https://boomi.b-cdn.net/wp-content/uploads/2022/03/PANCs-conheca-as-plantas-alimenticias-nao-convencionais.png" alt="" /></SwiperSlide>

          <SwiperSlide data-hash="slide3"><img src="https://media.istockphoto.com/id/177688708/pt/foto/salada-grega.jpg?s=612x612&w=0&k=20&c=Ki9r5zf3rbChI2_PPtI8g6QfSuVOdcmO2wtr1bx7rqc=" alt="" /></SwiperSlide>

          <SwiperSlide data-hash="slide4"><img src="https://media.istockphoto.com/id/1139277687/pt/foto/various-plant-based-milk.jpg?s=612x612&w=0&k=20&c=WcxRqAYxQNpB6U8fZGcySlKYeJtVkelGYzGj7ejMReQ=" alt="" /></SwiperSlide>

          <SwiperSlide data-hash="slide5"><img src="https://brucalderon.com.br/wp-content/uploads/2020/05/Bolo-de-Lavanda.jpeg" alt="" /></SwiperSlide>

        </Swiper>
      </Grid>
    </>
  );
}
export default Carrosel;

