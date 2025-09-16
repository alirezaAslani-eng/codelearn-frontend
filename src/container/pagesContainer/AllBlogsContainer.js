import { AllBlogs } from "../../pages";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import { Helmet } from "react-helmet";
export default function AllBlogsContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.blogs.all,
  });

  return <>
  <Helmet>
    <title>کد لرن | بلاگ</title>
  </Helmet>
  <AllBlogs data={data} isLoading={isLoading} isError={isError} />;
  </> 
}
