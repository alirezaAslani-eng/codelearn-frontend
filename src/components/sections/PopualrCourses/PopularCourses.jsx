import  { useCallback, useRef } from "react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { swiperBrakePoint } from "../../../constant";
import "swiper/css";
// components From Ui
import {
  NavigateButton,
  CourseBox,
  HeaderSection,
  SwiperLoader,
} from "../../Ui";
import { LoadeingErrorHandler } from "../../Modules";
function PopularCourses({ data, isError, isLoading }) {
  const swiperRef = useRef(null);
  const prev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);
  const next = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  return (
    <>
      <div className="mb-12 _840:mb-20">
        <HeaderSection
          mainTitle={"محبوب ترین ها"}
          subTitle="مهم های بازار را یاد بگیر"
        >
          <div id="navigatePopular" className="flex items-center gap-x-2">
            <NavigateButton right onClick={prev} className="clickAnimate" />
            <NavigateButton onClick={next} className="clickAnimate" />
          </div>
        </HeaderSection>
      </div>
      <LoadeingErrorHandler
        isLoading={{
          check: isLoading,
          loading: <SwiperLoader />,
        }}
        isError={{
          check: isError,
          error: <SwiperLoader />,
        }}
        dataCheck={{ check: data?.length, error: null }}
      >
        <Swiper
          observeParents={true}
          observer={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={swiperBrakePoint.defaultSlidesPerView}
          spaceBetween={swiperBrakePoint.defaultSpace}
          className="mySwiper"
          breakpoints={swiperBrakePoint}
          modules={[Navigation]}
        >
          {data?.map((item) => {
            return (
              <SwiperSlide key={item?._id}>
                <div className="course-swiper">
                  <CourseBox {...item} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LoadeingErrorHandler>
    </>
  );
}
export default PopularCourses;
