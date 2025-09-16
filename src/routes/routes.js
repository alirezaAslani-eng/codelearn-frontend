import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Main, userPanel } from "./clientPath";
import { Home, Register, Login, BuyCoursePage, MobileChat } from "../pages";
import {
  CategoryContainer,
  AllCoursesContainer,
  AllBlogsContainer,
  GlobalSearchContainer,
} from "../container";
import { UserPanelPrivet } from "../components/Modules";
import { RootLayout } from "../layout";
// Lazied -- >
const RootUserPanel = lazy(() => import("../layout/RootUserPanel"));
const ContactUs = lazy(() => import("../pages/ContactUs/ContactUs"));
const CourseInfoContainer = lazy(() =>
  import("../container/pagesContainer/CourseInfoContainer")
);
const BlogInfoContainer = lazy(() =>
  import("../container/pagesContainer/BlogInfoContainer")
);
const SessionInfoContainer = lazy(() =>
  import("../container/pagesContainer/SessionInfoContainer")
);
const routes = createBrowserRouter([
  { path: "/", element: <Navigate to={"/" + Main.root} /> },
  {
    path: Main.root,
    element: <RootLayout />,
    children: [
      // Main-Page ----- >
      {
        index: true,
        element: <Home />,
      },
      // SingnUp-Page -- >
      {
        path: Main.register,
        element: <Register />,
      },
      // Login-Page -- >
      {
        path: Main.login,
        element: <Login />,
      },
      // ContactUs-Page -- >
      {
        path: Main.contact,
        element: (
          <Suspense>
            <ContactUs />
          </Suspense>
        ),
      },
      // Category-Page -- >
      {
        path: Main.category + "/:categoryName",
        element: <CategoryContainer />,
      },
      // Courses-Page -- >
      {
        path: Main.courses,
        element: <AllCoursesContainer />,
      },
      // Info of a Course-Page -- >
      {
        path: Main.course_info + "/:courseName",
        element: (
          <Suspense>
            <CourseInfoContainer />
          </Suspense>
        ),
      },
      // Info of a session-Page -- >
      {
        path: Main.session_info + "/:courseShortName/:sessionId",
        element: (
          <Suspense>
            <SessionInfoContainer />
          </Suspense>
        ),
      },
      // Blogs-Page -- >
      {
        path: Main.blogs,
        element: <AllBlogsContainer />,
      },
      // Info of a blog-Page -- >
      {
        path: Main.blog_info + "/:blogName",
        element: (
          <Suspense>
            <BlogInfoContainer />
          </Suspense>
        ),
      },
      // final buy-Page -- >
      {
        path: Main.buy_course,
        element: <BuyCoursePage />,
      },
      // globasl result of a serach-Page -- >
      {
        path: Main.globalSearch + "/:searchValue",
        element: <GlobalSearchContainer />,
      },
      // chat-Page -- >
      {
        path: Main.chat,
        element: <MobileChat />,
      },
    ],
  },
  // User Panel-Root --->
  {
    path: userPanel.root + "/*",
    element: (
      <UserPanelPrivet>
        <Suspense>
          <RootUserPanel />
        </Suspense>
      </UserPanelPrivet>
    ),
  },
]);
export { routes };
