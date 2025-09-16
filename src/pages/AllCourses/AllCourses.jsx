import {
  BlogBoxLoader,
  BreadCrump,
  CourseBox,
  Tag,
  TitleWithEffect,
} from "../../components/Ui";
import { ShowListWithFilter } from "../../components/Modules";
import { useParams } from "react-router-dom";
import { FilterProvider } from "../../context/FilterContext";
import { useBreadCrump } from "../../hooks";
import { fromMain, Main } from "../../routes/clientPath";

export default function AllCourses({ data, isError, isLoading }) {
  const { categoryId } = useParams();
  useBreadCrump({
    breadCrumpArray: [{ link: fromMain(Main.courses), text: "دوره ها" }],
  });
  return (
    <>
      <section className="container">
        <section className="mt-3 sm:mt-6">
          <BreadCrump />
        </section>
        <section className="flex items-center justify-between my-5 _840:my-10 font-dana-md">
          <TitleWithEffect>تمام دوره ها</TitleWithEffect>
          <Tag
            text={
              <div className="flex items-center gap-x-1 font-dana-md">
                {data?.length}
                <h1>دوره</h1>
              </div>
            }
          />
        </section>
        <FilterProvider>
          <ShowListWithFilter
            data={data}
            loaderComponent={<BlogBoxLoader count={10} />}
            isError={isError}
            isLoading={isLoading}
            Component={CourseBox}
            categoryId={categoryId}
            categoryBackLink="/all-courses/all"
            categoryRoute="/all-courses"
            serachPath="name"
          />
        </FilterProvider>
      </section>
    </>
  );
}
