import { Category } from "../../pages";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import { getCoursesBasedOnCategory } from "../../api";
import { Helmet } from "react-helmet";
// THIS IS PAGE CONTAINER >>>
export default function CourseInfoContainer() {
  const { categoryName } = useParams(); // categoryName <<

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.courses.basedOnCategory(categoryName), // set query based on category name .
    queryFn: () =>
      getCoursesBasedOnCategory({
        param: categoryName, // get data from server basedv on category name
      }),
  });

  return (
    <>
    <Helmet>
      <title>
        دسته بندی | {categoryName}
      </title>
    </Helmet>
      <Category data={data} isLoading={isLoading} isError={isError} />
    </>
  );
}
