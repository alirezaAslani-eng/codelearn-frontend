import { useLocation } from "react-router-dom";
import { useContext } from "react";
// components
import {
  BreadCrump,
  Tag,
  TitleWithEffect,
  Button,
  Img,
} from "../../components/Ui";
import LeftSide from "./LeftSide";
// Context
import { AuthContext, CartsContext } from "../../context";
import { CourseDetails } from "../../components/sections";
import { CourseInfoContext } from "../../context/pageContext";
import { useBreadCrump } from "../../hooks";
import { Opacity } from "../../components/Modules";
import { imageAddrees } from "../../constant/SerevrRoute";
import { fromMain, Main } from "../../routes/clientPath";

export default function CoursInfo() {
  // USE-CONTEXT >
  const { courseInfo } = useContext(CourseInfoContext);
  const { addCart, carts } = useContext(CartsContext);
  const authContext = useContext(AuthContext); // Authorization
  // BreadCrump -- >
  const { pathname } = useLocation();
  useBreadCrump({
    breadCrumpArray: [
      { text: "دوره ها", link: fromMain(Main.courses) },
      { text: courseInfo?.name, link: pathname },
    ],
  });

  return (
    <div>
      {/* BreadCrump */}
      <section className="container mt-3 sm:mt-6">
        <BreadCrump />
      </section>
      {/* (Start) IntroSection section*/}
      <section className="container mt-3 sm:mt-6">
        <div className="w-full flex flex-col _840:flex-row items-center lg:items-stretch gap-3 sm:gap-6">
          {/* short details */}
          <div className="w-full _840:w-1/2 order-2 _840:order-1">
            <IntroSection
              isLoagin={authContext?.isLogin}
              isRegister={courseInfo?.isUserRegisteredToThisCourse}
              category={courseInfo?.categoryID?.title}
              title={courseInfo?.name}
              desc={courseInfo?.description}
              creator={courseInfo?.creator?.name}
              isAddThisCourse={carts?.some(
                (item) => item?._id == courseInfo?._id
              )}
              onAddCart={() => {
                addCart({ allInfo: courseInfo });
              }}
            />
          </div>
          {/* Cover intro */}
          <div className="w-full _840:w-1/2 font-dana-md order-1 _840:order-2">
            <Img
              inViewPortOption={false}
              loader
              loaderClassName="aspect-video rounded-xl"
              src={imageAddrees + courseInfo?.cover || ""}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* (Finish) IntroSection section*/}

      {/* (Start) Body section*/}
      <section className="container mt-3 sm:mt-6">
        <div className="grid grid-cols-12 gap-3 sm:gap-6">
          {/* Right Side */}
          <aside className="col-span-12 lg:col-span-8 space-y-6 ">
            <CourseDetails />
          </aside>
          {/* Left Side */}
          <aside className="col-span-12 lg:col-span-4 font-dana-md ">
            <LeftSide />
          </aside>
        </div>
      </section>
      {/* (Finish) Body section*/}
    </div>
  );
}

function IntroSection({
  category = "",
  title = "",
  desc = "",
  isLoagin = false,
  isRegister = false,
  isAddThisCourse = false,
  onAddCart = () => {},
  creator = "",
}) {
  return (
    <section className="flex flex-col gap-2 justify-between h-full">
      <div className="space-y-3">
        {/* category */}
        <Tag text={category} />
        {/* title */}
        <TitleWithEffect>{title}</TitleWithEffect>
        {/* description */}
        <p className="text-dark/50 dark:text-light/50 line-clamp-3 font-dana-md">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-3">
        {isLoagin ? (
          isRegister ? (
            <Button className="accent-outline w-fit font-dana-md">
              {"دانشجو دوره هستید"}
            </Button>
          ) : isAddThisCourse ? (
            <Opacity
              key="added-to-cart"
              className="block font-dana-md success-text"
            >
              {"به سبد خرید اضافه شد"}
            </Opacity>
          ) : (
            <Button onClick={onAddCart} className="accent w-fit font-dana-md">
              {"افزودن به سبد"}
            </Button>
          )
        ) : (
          <Button
            to={fromMain(Main.login)}
            className="accent-outline w-fit font-dana-md"
          >
            {"لطفا اول وارد شوید"}
          </Button>
        )}

        <Tag
          text={
            <>
              {"مدرس دوره : "}
              {creator}
            </>
          }
        />
      </div>
    </section>
  );
}
