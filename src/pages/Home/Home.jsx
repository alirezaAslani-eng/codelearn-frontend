import { Helmet } from "react-helmet";
import { HeaderSection } from "../../components/Ui";
// sections -- >
import Landing from "../../components/sections/Landing/Landing";
import Categories from "../../components/sections/Categories/Categories";
import NewBlogs from "../../components/sections/NewBlogs/NewBlogs";
import PreSaleCourses from "../../components/sections/PreSaleCourse/PreSaleCourses";
import PopualrCourses from "../../components/sections/PopualrCourses/PopularCourses";
import NewCourses from "../../components/sections/NewCourses/NewCourses";
// css
import "./home.css";
import { HocWithDataA } from "../../components/sharedLogic/hoc";
import { queryKeys } from "../../libs/reactQuery";
import { fromMain, Main } from "../../routes/clientPath";
import AboutUs from "../../components/sections/AboutUs/AboutUs";

const LandingWithData = HocWithDataA({ queryKey: queryKeys.landingInfo.all })(
  Landing
);
const NewCoursesWithData = HocWithDataA({
  queryKey: queryKeys.courses.all,
})(NewCourses);
const PopualrCoursesWithData = HocWithDataA({
  queryKey: queryKeys.popularCourses.all,
})(PopualrCourses);
const PreSaleCoursesWithData = HocWithDataA({
  queryKey: queryKeys.preSaleCourses.all,
})(PreSaleCourses);
const NewBlogsWithData = HocWithDataA({ queryKey: queryKeys.blogs.all })(
  NewBlogs
);
const CategoriesWithData = HocWithDataA({ queryKey: queryKeys.categories.all })(
  Categories
);

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>{"کد لرن" + " | " + "برنامه نویسی"}</title>
      </Helmet>
      {/* Landing */}
      <LandingWithData />
      <div role="warrapper" className=" space-y-12 _840:space-y-20 pt-10">
        {/* (Start) new courses section --------------->>*/}
        <section className="container">
          <div className="mb-12 _840:mb-20">
            <HeaderSection
              mainTitle={"جدید ترین ها"}
              subTitle={"سکو پرتاب شما به سمت موفقیت"}
              linkText="همه دوره ها"
              link={fromMain(Main.courses)}
            />
          </div>
          <NewCoursesWithData />
        </section>
        {/* (Finish) new courses section <<---------------*/}

        {/* (Start) About us section --------------->>*/}
        <section className="container">
          <div className="mb-12 _840:mb-20">
            <HeaderSection
              mainTitle={"کد لرن چه کمکی میتونه کنه ؟"}
              subTitle={"این جا یک آکادمی خصوصی هست پس بنابر این "}
            />
          </div>

          <AboutUs />
          {/* Static */}
        </section>
        {/* (Finish) About us section <<---------------*/}

        {/* (Start) popular section --------------->>*/}
        <section className="container">
          {/* this is a slider */}
          <PopualrCoursesWithData />
        </section>
        {/* (Finish) popular section <<---------------*/}

        {/* (Start) Category section --------------->>*/}
        <section className="container ">
          <div className="mb-12 _840:mb-20">
            <HeaderSection
              mainTitle={"دسته بندی"}
              subTitle={"مسیر خودت را انتخاب  کن"}
            />
          </div>
          <CategoriesWithData />
        </section>
        {/* (Finish) Category section <<---------------*/}

        {/* (Start) pre sale section --------------->>*/}
        <section className="container">
          {/* this is a slider */}
          <PreSaleCoursesWithData />
        </section>
        {/* (Finish) pre sale section <<---------------*/}

        {/* (Start) new blogs section --------------->>*/}
        <section className="container">
          <div className="mb-12 _840:mb-20">
            <HeaderSection
              mainTitle={"جدید ترین مقالات"}
              subTitle="حاصل تجربه های ما هستن"
              linkText="همه مقاله ها"
              link={fromMain(Main.blogs)}
            />
          </div>
          <NewBlogsWithData />
        </section>
      </div>
      {/* (Finish) new blogs section <<---------------*/}
    </div>
  );
}
