import { useContext } from "react";
// component >>
import { BreadCrump, QuickAccesBox } from "../../components/Ui";
import { RelatedCourses as PopularCourses } from "../../components/Modules";
// context >>
import { AuthContext } from "../../context";
// section -- >
import { BlogDetails } from "../../components/sections";
import { BlogInfoContext } from "../../context/pageContext";
import { useBreadCrump } from "../../hooks";
import { HocWithDataA } from "../../components/sharedLogic/hoc";
import { queryKeys } from "../../libs/reactQuery";
import { fromMain, Main } from "../../routes/clientPath";
// Hoc -- >
const PopularCoursesWithData = HocWithDataA({
  queryKey: queryKeys?.popularCourses.all,
})(PopularCourses);

export default function BlogInfo() {
  // use-context >>
  const { isLogin } = useContext(AuthContext);
  const { shortName = "", title = "" } = useContext(BlogInfoContext)?.blogInfo;

  useBreadCrump({
    breadCrumpArray: [
      { text: "مقاله ها", link: fromMain(Main.blogs) },
      { text: `${title}`, link: fromMain(`${Main.blog_info}/${shortName}`) },
    ],
  });
  return (
    <div>
      <section className="mt-3 sm:mt-6 container">
        <BreadCrump />
      </section>
      {/* Start body section */}
      <section className="container mt-3 sm:mt-6">
        <div className="grid grid-cols-12 gap-3 sm:gap-6">
          {/* Right Side */}
          <aside className="col-span-12 lg:col-span-8">
            <section className="boxContainer">
              <BlogDetails />
            </section>
          </aside>

          {/* Left Side */}
          <aside className="col-span-12 lg:col-span-4 font-dana-md ">
            <div className="space-y-6">
              <section className="boxContainer">
                <QuickAccesBox isLogin={isLogin} />
              </section>
              <section className="boxContainer">
                <PopularCoursesWithData title="محبوب ترین ها" />
              </section>
            </div>
          </aside>
        </div>
      </section>
      {/* Finish body section */}
    </div>
  );
}
