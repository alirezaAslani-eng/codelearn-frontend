// components >>
import { BlogBoxLoader, CourseBox } from "../../Ui";
// constants >>
import { new_courses_count } from "../../../constant"; // a number <<
import { LoadeingErrorHandler } from "../../Modules";

function NewCourses({ data = [], isLoading = true, isError = false }) {
  return (
    <>
      <div className="brakPointGrid ">
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
          {data
            ?.slice()
            .splice(0, new_courses_count)
            .map((item) => (
              <CourseBox key={item?._id} {...item} />
            ))}
        </LoadeingErrorHandler>
      </div>
    </>
  );
}

export default NewCourses;
