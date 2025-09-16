import { useContext } from "react";
import { BlogInfo } from "../../pages";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import { getOneBlog } from "../../api";
import { BlogInfoContext } from "../../context/pageContext";
import { BlogInfoLoader } from "../../components/Ui";
import { Helmet } from "react-helmet";

export default function CourseInfoContainer() {
  const { blogName } = useParams(); // blogName to get data <<
  const authContext = useContext(AuthContext); // context to send token to server <<

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.blogs.one(`${blogName},${authContext.userToken}`),
    queryFn: () =>
      getOneBlog({
        headers: {
          Authorization: `Bearer ${authContext.userToken}`,
          "Content-Type": "application/json",
        },
        param: blogName,
      }),
  });

  if (isLoading) return <BlogInfoLoader />;
  else if (isError) return <BlogInfoLoader />;
  return (
    <BlogInfoContext.Provider value={{ blogInfo: data }}>
      <Helmet>
        <title>{"کد لرن" + " | " + data?.title || ""}</title>
        <meta name="description" content={data?.description || ""} />
      </Helmet>
      {!isLoading ? !isError ? <BlogInfo /> : "Error" : "loading"}
    </BlogInfoContext.Provider>
  );
}
