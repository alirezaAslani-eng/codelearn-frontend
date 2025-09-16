
import "swiper/css";
import {
  BoxPending,
  CourseBoxUserPanel,
  NoData,
  SerevrError,
} from "../../Ui";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";
import { Swiper, SwiperSlide } from "swiper/react";
const defProps = {
  courses: [],
  isLoading: false,
  isError: false,
};
export default function UserRecentlyCourses({
  courses = defProps.courses,
  isError = defProps.isError,
  isLoading = defProps.isLoading,
}) {
  return (
    <>
      <LoadeingErrorHandler
        isError={{
          error: <SerevrError />,
          check: isError,
        }}
        isLoading={{
          loading: (
            <div className="grid grid-cols-1 2xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
              <BoxPending count={2} />
            </div>
          ),
          check: isLoading,
        }}
        dataCheck={{
          error: <NoData />,
          check: courses?.filter((item) => item)?.length,
        }}
      >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          className="mySwiper"
          freeMode={true}
        >
          {courses?.slice(0, 10)?.map((course, index) => {
            if (!course) {
              return;
            }
            return (
              <SwiperSlide className="!w-fit" key={course?._id || index}>
                <div className="w-[300px]">
                  <CourseBoxUserPanel {...course} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LoadeingErrorHandler>
    </>
  );
}
