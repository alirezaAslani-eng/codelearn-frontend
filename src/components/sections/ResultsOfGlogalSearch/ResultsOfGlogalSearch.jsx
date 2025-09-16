import { useEffect, useState } from "react";
import { BlogBox, Button, CourseBox, TitleWithEffect } from "../../Ui";
import {
  HiInformationCircle,
  HiOutlineArrowCircleLeft,
} from "../../Ui/icons/icons";
import { useNavigate } from "react-router-dom";

export default function ResultsOfGlogalSearch({ data, searchValue }) {
  const [courses_result, setCourses_result] = useState([]);
  const [blogs_result, setBlogs_result] = useState([]);
  const [coursesOrBlogs, setCoursesOrBlog] = useState(true); // true = show courses / false = show blogs
  const nav = useNavigate();
  useEffect(() => {
    if (coursesOrBlogs) {
      setCourses_result(data?.allResultCourses || []);
    } else {
      setBlogs_result(data?.allResultArticles || []);
    }
  }, [data, coursesOrBlogs]);

  return (
    <section className="font-dana-md container">
      <div className="flex justify-between items-center flex-wrap gap-x-2">
        <TitleWithEffect
          secondText={
            coursesOrBlogs ? "سکو پرتاپ شما به موفقیت" : "حاصل تجربه ما"
          }
          className="mt-6"
        >
          {coursesOrBlogs
            ? "نتیجه جستجو برای دوره ها"
            : "نتیجه جستجو برای مقاله ها"}
        </TitleWithEffect>
        <Button onClick={() => nav(-1)} className="accent-outline rounded-full">
          <HiOutlineArrowCircleLeft />
        </Button>
      </div>
      {/* Change Button */}
      <div className="flex items-center gap-2 mt-6 sticky top-4 z-[2]">
        <Button
          onClick={() => setCoursesOrBlog(true)}
          className={`${coursesOrBlogs ? "accent" : "accent-outline"}`}
        >
          دوره ها
        </Button>
        <Button
          onClick={() => setCoursesOrBlog(false)}
          className={`${coursesOrBlogs ? "accent-outline" : "accent"}`}
        >
          مقاله ها
        </Button>
      </div>
      {/* Items */}
      <section className="mt-3 sm:mt-6">
        <div className="brakPointGrid">
          {coursesOrBlogs ? (
            <CoursesResultSection
              value={courses_result}
              searchValue={searchValue}
            />
          ) : (
            <BlogsResultSection
              value={blogs_result}
              searchValue={searchValue}
            />
          )}
        </div>
      </section>
    </section>
  );
}

function CoursesResultSection({ value = [], searchValue = "" }) {
  if (!value.length)
    return (
      <NoResult
        icon={<HiInformationCircle className="min-w-[30px] min-h-[30px]" />}
      >
        نتیجه ای برای {`(${searchValue})`} در قسمت دوره ها وجود ندارد !
      </NoResult>
    );
  return (
    <>
      {value.map((item, index) => (
        <CourseBox key={item?._id || index} {...item} />
      ))}
    </>
  );
}
function BlogsResultSection({ value = [], searchValue = "" }) {
  if (!value.length)
    return (
      <NoResult
        icon={<HiInformationCircle className="min-w-[30px] min-h-[30px]" />}
      >
        نتیجه ای برای {`(${searchValue})`} در قسمت مقاله ها وجود ندارد !
      </NoResult>
    );
  return (
    <>
      {value.map((item, index) => (
        <BlogBox key={item?._id || index} {...item} />
      ))}
    </>
  );
}

function NoResult({ children, icon }) {
  return (
    <div
      className="
    text-lg
    text-center
    flex 
    flex-col 
    sm:flex-row 
    justify-center 
    items-center 
    gap-4 w-full 
    col-span-full 
    bg-secondary-light 
    dark:bg-secondary-dark 
    rounded-lg 
    shadow p-5 
    text-dark 
    dark:text-light"
    >
      {children}
      {icon}
    </div>
  );
}
