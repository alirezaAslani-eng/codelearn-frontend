import { useQuery } from "@tanstack/react-query";
import { getRelatedCourses } from "../../../api";
import { queryKeys } from "../../../libs/reactQuery";
import { memo } from "react";

function HocGetRelatedCourses(Component) {
  function WithData(props) {
    const { shortName = "" } = props;
    const {
      data: relatedCourses,
      isLoading: RelatedCoursesLoading,
      isError: RelatedCoursesError,
    } = useQuery({
      enabled: !!shortName,
      queryKey: queryKeys.courses.related(shortName), // get related courses based on shortName property !
      queryFn: () => getRelatedCourses({ param: shortName }),
    });
    return (
      <Component
        data={relatedCourses}
        isLoading={RelatedCoursesLoading}
        isError={RelatedCoursesError}
        {...props}
      />
    );
  }
  return memo(WithData);
}

export default HocGetRelatedCourses;
