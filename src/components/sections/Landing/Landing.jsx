import { useContext } from "react";
import { Link } from "react-router-dom";
// components From Ui
import { LightButton, Text, FeatureBox, Img } from "../../Ui";
import SerachBoxHeader from "../../Ui/SerachBox/SerachBoxHeader";
// contextAPI
import { AuthContext } from "../../../context";
import { HocGlobalSearch } from "../../sharedLogic/hoc";
import { LoadeingErrorHandler } from "../../Modules";
import { StudentIcon, CodeIcon, ClockIcon } from "../../../assist/svg";
import { fromMain, Main } from "../../../routes/clientPath";
// HOC -- >
const SerachBoxHeaderWithLogic = HocGlobalSearch(SerachBoxHeader);
// Lazy -- >
// default props -- >
const defProps = {
  data: [],
  isLoading: false,
  isError: false,
};
export default function Landing({
  data = defProps.data,
  // isLoading = defProps.isLoading,
  // isError = defProps.isError,
}) {
  // to check user is authenticate so that it can show sign in button >>
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className=" min-h-[600px] h-screen relative bg-primary-dark">
        <Img
          lazy={false}
          motion={false}
          inViewPortOption={false}
          src="/codelearn-frontend/images/landingBackground.webp"
          srcSet={"images/hero-xs.webp 600w, images/hero-lg.webp 1920w,"}
          sizes={"100vw"}
          className="image absolute inset-0"
        />

        <div className="w-full h-full absolute inset-0 z-[2] backdrop-blur-sm px-4 flex justify-center items-center flex-col gap-y-6">
          <span className="text-3xl lg:text-5xl font-peyda-bold text-light text-center">
            مهارت برنامه نویسی را با کد لرن شروع کنید
          </span>
          <Text className="text-center" dark={false}>
            با آکادمی خصوصی کد لرن, علم برنامه نویسی رو با خیال راحت یاد بگیر و
            پیشرفت کن
          </Text>
          <div className="w-[min(380px,100%)] font-dana-md">
            <SerachBoxHeaderWithLogic
              autoFocus={false}
              placeholder="دوره ری اکت,اموزش جامع پایتون..."
              btnClassName="bg-bg-accent rounded-xl p-3 dark:text-dark"
              className="!pl-2 !py-2 !placeholder-dark"
            />
          </div>

          {/* Register Button */}
          {!authContext.isLogin && (
            <Link to={fromMain(Main.register)}>
              <LightButton className={"text-base animate-initialShow"}>
                همین الان شروع کن
              </LightButton>
            </Link>
          )}
          {/* // Features */}
          <div className="text-light flex items-center gap-5 relative transition-all inset-0">
            <div className="flex flex-col items-center gap-y-3">
              <FeatureBox
                text={data?.coursesCount || "0"}
                subText="دوره های ما"
              />
              <CodeIcon className="text-light/80 size-14" />
            </div>
            <div className="flex flex-col items-center gap-y-3">
              <FeatureBox
                text={data?.usersCount || "0"}
                subText="داشنجو داریم"
              />
              <StudentIcon className="text-light/80 size-14" />
            </div>
            <div className="flex flex-col items-center gap-y-3">
              <FeatureBox text={data?.totalTime || "0"} subText="ساعت اموزش " />
              <ClockIcon className="text-light/80 size-14" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
