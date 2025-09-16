import { AllCourses } from "../../pages";
import { queryKeys } from "../../libs/reactQuery";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function AllCoursesContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.courses.all,
  });

  return (
    <>
      <Helmet>
        <title>کد لرن | دوره</title>
      </Helmet>
      <AllCourses data={data} isError={isError} isLoading={isLoading} />;
    </>
  );
}
