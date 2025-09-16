import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SessionInfo } from "../../pages";
import { AuthContext } from "../../context";
import { queryKeys } from "../../libs/reactQuery";
import { getOneCourse, getOneSession } from "../../api";
import { SessionInfoContext } from "../../context/pageContext";
import { Helmet } from "react-helmet";
export default function CourseInfoContainer() {
  const { sessionId, courseShortName } = useParams(); // sessionId and courseShortName to get data <<
  const authContext = useContext(AuthContext); // context to send token to server <<

  const {
    // get sessionInfo to show data in this page .
    data: sessionInfo,
    isLoading: sessionIsLoading,
    isError: sessionIsError,
  } = useQuery({
    queryKey: queryKeys.sessions.one(`${sessionId},${authContext.userToken}`),
    queryFn: () =>
      getOneSession({
        headers: {
          Authorization: `Bearer ${authContext.userToken}`,
        },
        param: `${courseShortName}/${sessionId}`, // like -> npm/23423h4k23j4b
      }),
  });
  const {
    // get courseInfo to show courseInfo related to this sessionInfo in this page
    // (this is a problem that presure me to get a course from server insted of use session info properties).
    data: courseInfo,
    isLoading: courseInfoIsLoading,
    isError: courseInfoIsError,
  } = useQuery({
    queryKey: queryKeys.courses.one(courseShortName),
    queryFn: () =>
      getOneCourse({
        headers: {
          Authorization: `Bearer ${authContext.userToken}`,
        },
        param: courseShortName,
      }),
  });

  if (sessionIsLoading || courseInfoIsLoading) return null;
  else if (sessionIsError || courseInfoIsError) return null;

  const sessionNumber =
    sessionInfo?.sessions?.findIndex(
      (item) => item?._id == sessionInfo?.session?._id
    ) + 1;
  return (
    <SessionInfoContext.Provider
      value={{
        sessionInfo: {
          ...sessionInfo,
          sessionNumber,
        },
        courseInfo: courseInfo,
      }}
    >
      <Helmet>
        <title>{sessionInfo?.session?.title || ""}</title>
      </Helmet>
      <SessionInfo />;
    </SessionInfoContext.Provider>
  );
}
