import { useContext } from "react";
// components from Ui
import {
  QuickAccesBox,
  ShortLink,
  Tag,
  ViewCommentCounter,
} from "../../components/Ui";
// icon
import { HiOutlineUserGroup } from "../../components/Ui/icons/icons";
import { CourseInfoContext } from "../../context/pageContext";
import { HocGetRelatedCourses } from "../../components/sharedLogic/hoc";
import RelatedCourses from "../../components/Modules/RelatedCourses/RelatedCourses";
import { AuthContext } from "../../context";
// Hoc conect logic -- >
const RelatedCoursesWithData = HocGetRelatedCourses(RelatedCourses);
export default function LeftSide() {
  const { courseInfo } = useContext(CourseInfoContext);
  const { isLogin } = useContext(AuthContext);
  return (
    <section className="space-y-3 sm:space-y-6">
      {/* student count */}
      <div className="flex flex-col md:flex-row lg:flex-col items-stretch gap-3 sm:gap-6">
        <div className="boxContainer flex-1">
          <div className=" text-sm flex items-center gap-2 text-dark dark:text-light">
            <span className="flex items-center gap-2">
              <HiOutlineUserGroup className="size-6" />
              تعداد دانش آموزان :
            </span>
            <Tag
              text={
                courseInfo?.courseStudentsCount == 0
                  ? "صفر"
                  : courseInfo?.courseStudentsCount
              }
            />
          </div>
        </div>
        {/* view count and comment count section */}
        <div className="boxContainer flex-1">
          <ViewCommentCounter commentCount={courseInfo?.comments?.length} />
        </div>
      </div>
      {/* short link */}
      <div className="boxContainer">
        <ShortLink link={`http://localhost:3000`} />
      </div>
      {/* related courses */}
      <div className="boxContainer text-dark dark:text-light">
        <RelatedCoursesWithData shortName={courseInfo?.shortName} />
      </div>
      <div className="boxContainer text-dark dark:text-light">
        <QuickAccesBox isLogin={isLogin} />
      </div>
    </section>
  );
}
