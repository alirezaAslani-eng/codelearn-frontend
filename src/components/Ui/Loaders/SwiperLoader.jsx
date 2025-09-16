import { Swiper, SwiperSlide } from "swiper/react";
import { swiperBrakePoint } from "../../../constant";
import BlogBoxLoader from "./BlogBoxLoader";

export default function SwiperLoader({ count = 10, className = "" }) {
  const loderCountt = Array.from({ length: count || 10 }, (_, index) => {
    return index + 1;
  });
  return (
    <>
      <Swiper
        slidesPerView={swiperBrakePoint.defaultSlidesPerView}
        spaceBetween={swiperBrakePoint.defaultSpace}
        className="mySwiper"
        breakpoints={swiperBrakePoint}
      >
        {loderCountt?.map((swip) => {
          return (
            <SwiperSlide key={swip} className={className}>
              <BlogBoxLoader count={1} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
