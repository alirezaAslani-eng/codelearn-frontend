import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CoursInfo } from "../../pages";
import { AuthContext } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import { getOneCourse } from "../../api";
import { CourseInfoContext } from "../../context/pageContext";
import { BlogInfoLoader } from "../../components/Ui";
import { Helmet } from "react-helmet";
// THIS IS PAGE CONTAINER >>>
export default function CourseInfoContainer() {
  // HOOK -- >
  const { courseName } = useParams(); // courseName <<
  const authContext = useContext(AuthContext); // context <<

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.courses.one(`${courseName},${authContext.userToken}`),
    queryFn: () =>
      getOneCourse({
        headers: {
          Authorization: `Bearer ${authContext.userToken}`,
        },
        param: courseName,
      }),
  });

  if (isLoading) return <BlogInfoLoader />;
  else if (isError) return <BlogInfoLoader />;
  return (
    <CourseInfoContext.Provider value={{ courseInfo: data }}>
      <Helmet>
        <title>{"کد لرن" + " | " + data?.name || ""}</title>
        <meta name="description" content={data?.description || ""} />
      </Helmet>
      <CoursInfo />
    </CourseInfoContext.Provider>
  );
}
