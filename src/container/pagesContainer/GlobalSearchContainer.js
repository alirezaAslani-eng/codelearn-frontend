import { useParams } from "react-router-dom";
import { GlobalSearch } from "../../pages";
import { useQuery } from "@tanstack/react-query";
import getResultOfSearch from "../../api/get/getSearchResult/getSearchResult";
import { queryKeys } from "../../libs/reactQuery";
import { BlogBoxLoader } from "../../components/Ui";
export default function GlobalSearchContainer() {
  const { searchValue } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.globalSearch.one(searchValue), // set query based on search value .
    queryFn: () =>
      getResultOfSearch({
        param: searchValue,
      }),
  });

  if (isLoading)
    return (
      <div className="brakPointGrid container mt-3 sm:mt-6">
        <BlogBoxLoader count={8} />
      </div>
    );
  else if (isError)
    return (
      <div className="brakPointGrid container mt-3 sm:mt-6">
        <BlogBoxLoader count={8} />
      </div>
    );
  return <GlobalSearch data={data} searchValue={searchValue} />;
}
