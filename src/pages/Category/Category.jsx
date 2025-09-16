// components >>
import { useParams } from "react-router-dom";
import { ShowListWithFilter } from "../../components/Modules";
import {
  BlogBoxLoader,
  BreadCrump,
  CourseBox,
  Tag,
  TitleWithEffect,
} from "../../components/Ui";
import { FilterProvider } from "../../context/FilterContext";
import { useBreadCrump } from "../../hooks";
import { fromMain, Main } from "../../routes/clientPath";

export default function Category({ data, isError, isLoading }) {
  const { categoryName } = useParams();
  useBreadCrump({
    breadCrumpArray: [
      { link:fromMain(`${Main.category}/${categoryName}`), text: `دسته بندی ` },
    ],
  });
  return (
    // This component responsible for geting courses data based on category and apply some logic on it like searching , filtering and pagination .
    <div className="container">
      <section className="mt-3 sm:mt-6">
        <BreadCrump />
      </section>
      <section className="flex items-center justify-between my-5 _840:my-10 font-dana-md">
        <TitleWithEffect>دسته بندی دوره ها</TitleWithEffect>
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
          loaderComponent={<BlogBoxLoader count={10} />}
          data={data}
          isError={isError}
          isLoading={isLoading}
          Component={CourseBox}
          serachPath="name"
        />
      </FilterProvider>
    </div>
    // <CoursesBasedOnCategory data={coursesData} />
  );
}
