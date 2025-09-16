import { useContext } from "react";
import {
  CourseInfoContext,
  SessionInfoContext,
} from "../../../context/pageContext";
import { AuthContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { fromMain, Main } from "../../../routes/clientPath";

export default function SessionPrivet({ children }) {
  // Needed value to check user is access to whatch this session -- >
  const { isLogin, isPending: userLoading } = useContext(AuthContext); // to check is user login or not .

  const {
    courseInfo: { isUserRegisteredToThisCourse }, // did user pay for this course ?
  } = useContext(CourseInfoContext);

  const {
    sessionInfo: {
      session: { free }, // is session free ?
    },
  } = useContext(SessionInfoContext);
  const nav = useNavigate();

  
  // Start To Chech ---- >
  if (userLoading) return null;
  if (!isLogin) {
    // when user is not login and wants to open this page -- >
    nav(fromMain(Main.login));
    return null;
  } else if (!!isUserRegisteredToThisCourse) {
    // when user is login and registered to this course --- >
    return children;
  } else if (!!free) {
    // when user is not registered to this course but its login and this session is free --- >
    return children;
  } else {
    // when user is not registered to this course and its not free --- >
    return nav("/"+Main.root);
  }
}
