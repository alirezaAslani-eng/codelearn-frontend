// Dependencies -- >
import { ScrollRestoration, useRoutes } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useContext, useMemo } from "react";
// Component -- >
import { UserSideBar, UserSideBarMobile } from "../components/Modules";
import { UserTopBar } from "../components/Ui";
// utils -- >
import { themeHandler } from "../utils";
// Statick Data -- >
import { getUserPanelNavigations } from "../constant/staticData";
// Context -- >
import { AuthContext, ToggleActionsContext } from "../context";
// Provider -- >
import { FilterProvider } from "../context/FilterContext";
// Nested Pages -- >
import {
  AllOrders,
  AnswerTicket,
  MainPage,
  SendTicket,
  Tickets,
  UserAllCarts,
  UserAllCourses,
  UserDetails,
} from "../pages/UserPanel/pages";
import { Main, userPanel } from "../routes/clientPath";
import { BottomBar } from "../components/common";
import HocGetNowDate from "../components/sharedLogic/hoc/HocGetNowDate";
import { useSetScroll } from "../context/react-scroll";
// nested Routes structure they are here because of userPanel lazied -- >
const userPanelRoutes = [
  {
    path: userPanel.main,
    element: <MainPage />,
  },
  {
    path: userPanel.user_carts,
    element: <UserAllCarts />,
  },
  {
    path: userPanel.user_details,
    element: <UserDetails />,
  },
  {
    path: userPanel.new_ticket,
    element: <SendTicket />,
  },
  {
    path: userPanel.ticket_status + "/:ticketId",
    element: <AnswerTicket />,
  },
  {
    path: userPanel.tickets,
    element: (
      <FilterProvider>
        <Tickets />
      </FilterProvider>
    ),
  },
  {
    path: userPanel.odrers,
    element: (
      <FilterProvider>
        <AllOrders />
      </FilterProvider>
    ),
  },
  {
    path: userPanel.my_courses,
    element: <UserAllCourses />,
  },
];
// HOC -- >
const UserSideBarWithDate = HocGetNowDate(UserSideBar);
const UserSideBarMobileWithDate = HocGetNowDate(UserSideBarMobile);

export default function RootUserPanel() {
  const routes = useRoutes(userPanelRoutes); // user panel nested routes <<
  const isDesktop = useMediaQuery("(min-width:840px)"); // Dynamic Responsive <<

  // context --- >
  const { logout } = useContext(AuthContext);
  const { isOpenUserSideBar, userSideBarHandler } =
    useContext(ToggleActionsContext);

  // memoization --- >
  const memoizedTobBarProps = useMemo(() => {
    return {
      onOpenMenu: () => userSideBarHandler(true),
    };
  }, []);
  const memoizedUserSideBarProps = useMemo(() => {
    return {
      onClose: () => userSideBarHandler(false),
      onDark: () => themeHandler("dark"),
      onLight: () => themeHandler("light"),
      onLogout: () => logout({ navigatePath: "/" + Main.root }),
    };
  }, []);
  useSetScroll();
  return (
    <>
      <div className="w-full _840:flex">
        {isDesktop && (
          <div className=" hidden _840:block">
            <UserSideBarWithDate data={getUserPanelNavigations()} />
          </div>
        )}
        {!isDesktop && (
          <div className=" block _840:hidden">
            <UserSideBarMobileWithDate
              data={getUserPanelNavigations()}
              open={isOpenUserSideBar}
              {...memoizedUserSideBarProps}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <UserTopBar actions={memoizedTobBarProps} />
          <div className="relative user-panel-container user-top-container user-bottom-container min-h-[calc(100vh-65.6px)] _840:min-h-[calc(100vh-89.6px)]">
            {routes}
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
}

// {
//   path: "main",
//   element: <MainPage />,
// },
// {
//   path: "user-carts",
//   element: <UserAllCarts />,
// },
// {
//   path: "user-details",
//   element: <UserDetails />,
// },
// {
//   path: "new-ticket",
//   element: <SendTicket />,
// },
// {
//   path: "answer-ticket/:ticketId",
//   element: <AnswerTicket />,
// },
// {
//   path: "tickets",
//   element: (
//     <FilterProvider>
//       <Tickets />
//     </FilterProvider>
//   ),
// },
// {
//   path: "orders",
//   element: (
//     <FilterProvider>
//       <AllOrders />
//     </FilterProvider>
//   ),
// },
// {
//   path: "courses",
//   element: <UserAllCourses />,
// },
