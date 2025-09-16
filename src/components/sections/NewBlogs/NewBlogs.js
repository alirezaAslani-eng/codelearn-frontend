// components
import { BlogBox, BlogBoxLoader } from "../../Ui";
// constants >>
import { new_blogs_count } from "../../../constant";
import { LoadeingErrorHandler } from "../../Modules";

function NewBlogs({ data, isLoading, isError }) {
  return (
    <>
      <div className="brakPointGrid">
        <LoadeingErrorHandler
          isLoading={{
            check: isLoading,
            loading: <BlogBoxLoader count={8} />,
          }}
          isError={{
            check: isError,
            error: <BlogBoxLoader count={8} />,
          }}
          dataCheck={{ check: data?.length, error: null }}
        >
          {data?.slice(0, new_blogs_count)?.map((item) => (
            <BlogBox key={item._id} {...item} />
          ))}
        </LoadeingErrorHandler>
      </div>
    </>
  );
}
export default NewBlogs;
