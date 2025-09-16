import { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LoadeingErrorHandler,
  ShowListWithFilter,
} from "../../../components/Modules";
import {
  Button,
  CourseBoxUserPanel,
  NoData,
  SerevrError,
  Spiner,
  TitleWithEffect,
} from "../../../components/Ui";
import { HiOutlineArrowCircleLeft } from "../../../components/Ui/icons/icons";
import { AuthContext } from "../../../context";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";
import { FilterProvider } from "../../../context/FilterContext";
export default function UserAllCourses() {
  const {
    isError: userError,
    isPending: userLoading,
    userInfo,
  } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <motion.div {...getUserPanelMotionConfig()} className="h-full">
      <section className="flex items-center gap-x-2 justify-between mb-5">
        <TitleWithEffect>دوره های من</TitleWithEffect>
        <Button onClick={() => nav(-1)} className="accent-outline rounded-full">
          <HiOutlineArrowCircleLeft />
        </Button>
      </section>
      <FilterProvider>
        <LoadeingErrorHandler
          isError={{
            error: (
              <div className="abs-center">
                <SerevrError text="مشکلی پیش اومده" />
              </div>
            ),
            check: userError,
          }}
          isLoading={{
            loading: (
              <div className="abs-center">
                <Spiner text="درحال بارگیری" />
              </div>
            ),
            check: userLoading,
          }}
          dataCheck={{
            error: (
              <div className="abs-center">
                <NoData text="دوره ای ندارید" />
              </div>
            ),
            check: userInfo?.courses?.length,
          }}
        >
          <ShowListWithFilter
            data={userInfo?.courses || []}
            Component={CourseBoxUserPanel}
            serachPath="name"
          />
        </LoadeingErrorHandler>
      </FilterProvider>
    </motion.div>
  );
}
