import { CourseBoxRelated, RelatedCourseLoader } from "../../Ui";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";
const defProps = {
  data: [],
};
function RelatedCourses({
  // data -- >
  title = "دوره های مرتبط",
  isLoading = true,
  isError = false,
  data = defProps.data,
}) {
  return (
    <div>
      <h1 className="my-3">{title}</h1>
      <div className="space-y-3 max-h-[400px] overflow-y-auto hidden-scroll rounded-xl">
        <LoadeingErrorHandler
          isError={{ check: isError, error: <RelatedCourseLoader count={5} /> }}
          isLoading={{
            check: isLoading,
            loading: <RelatedCourseLoader count={5} />,
          }}
          dataCheck={{
            check: data?.length,
            error: "دروه ای در این بخش وجود ندارد",
          }}
        >
          {data?.map((item, index) => {
            return <CourseBoxRelated key={item?._id || index} {...item} />;
          })}
        </LoadeingErrorHandler>
      </div>
    </div>
  );
}

export default RelatedCourses;
