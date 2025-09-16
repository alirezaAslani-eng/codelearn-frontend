import { lazy, Suspense, useContext } from "react";
import { arryPath } from "../routes/withOutLayoutPaths";
// Router -- >
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
// Component -->
import { BottomBar, Header } from "../components/common";
import { GlobalSideBar } from "../components/Ui";
// Render-props -- >
import { GetNavLinks } from "../components/sharedLogic/renderProps";
// Context -- >
import { AuthContext, ToggleActionsContext } from "../context";
// utils -- >
import { themeHandler } from "../utils";
import { useMediaQuery } from "@mui/material";
import ChatBoxButton from "../components/Ui/Buttons/ChatBoxButton";
import ChatBoxIcon from "../components/Ui/ChatBox/ChatBoxIcon";
// Lazied Component -- >
const Footer = lazy(() => import("../components/common/Footer/Footer"));
const ChatBoxWithLogic = lazy(() =>
  import("../components/Ui/ChatBox/ChatBoxWithLogic")
);

function RootLayout() {
  const { pathname } = useLocation();
  const canIShow = !arryPath.includes(pathname.split("/")[2]);
  const isDesktop = useMediaQuery("(min-width:840px)");
  // Context - >
  const {
    globalSideBarHandler,
    isOpenGlobalSideBar,
    chatBoxHandler,
    isChatBoxOpen,
  } = useContext(ToggleActionsContext);
  // user feature -- >
  const { logout, isLogin } = useContext(AuthContext);

  // with Render Props -- >
  const GlobalSideBarWithData = ({ data }) => {
    return (
      <GlobalSideBar
        navigateList={data || []}
        onClose={globalSideBarHandler}
        isOpen={isOpenGlobalSideBar}
        onLogout={logout}
        onDark={themeHandler}
        onLight={themeHandler}
        isLogin={isLogin}
      />
    );
  };
  return (
    <>
      {canIShow ? (
        <>
          <Header />
          <GetNavLinks render={GlobalSideBarWithData} />
        </>
      ) : null}
      <Outlet />
      {/* <ScrollRestoration /> */}
      {/* Footer */}
      {canIShow ? (
        <>
          <footer className="mt-32">
            <Suspense>
              <Footer />
            </Suspense>
          </footer>
          <BottomBar />
        </>
      ) : null}

      <Suspense>
        <ChatBoxWithLogic />
      </Suspense>

      {isDesktop && (
        <div className="fixed left-5 bottom-5 z-[13]">
          <ChatBoxButton
            button={{ onClick: () => chatBoxHandler((prev) => !prev) }}
          >
            <ChatBoxIcon isOpen={isChatBoxOpen} />
          </ChatBoxButton>
        </div>
      )}
    </>
  );
}

export default RootLayout;
