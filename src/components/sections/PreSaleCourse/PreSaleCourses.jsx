import { useCallback, useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { swiperBrakePoint } from "../../../constant";
// components
import {
  NavigateButton,
  CourseBox,
  HeaderSection,
  SwiperLoader,
} from "../../Ui";
import { LoadeingErrorHandler } from "../../Modules";

function PreSaleCourses({ data, isLoading, isError }) {
  // REF >>
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
          mainTitle={"پیش فروش"}
          subTitle="بروز ترین تکنولوژی ها را از دست نده"
        >
          <div id="navigatePreSale" className="flex items-center gap-x-2">
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
            {data?.map((item, index) => {
              return (
       
                  <SwiperSlide key={item?._id || index}>
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

export default PreSaleCourses;
