import { useEffect, useState } from "react";
import { Button } from "../Buttons";
import { NavLink } from "react-router-dom";
import {
  HiX,
  HiMoon,
  HiOutlineSun,
  HiOutlineArrowCircleLeft,
} from "../icons/icons";
import Logo from "../Logo/Logo";
import { RippleButton } from "..";
import { getLink } from "../../../utils";
import {
  fromMain,
  fromUser,
  Main,
  userPanel,
} from "../../../routes/clientPath";

const defProps = {
  onClose: () => {},
  onLogout: () => {},
  onDark: () => {},
  onLight: () => {},
  navigateList: [],
};
export default function GlobalSideBar({
  onClose = defProps.onClose,
  onLogout = defProps.onLogout,
  onDark = defProps.onDark,
  onLight = defProps.onLight,
  navigateList = defProps.navigateList,
  isOpen = false,
  backCover = true,
  isLogin = false,
}) {
  const [isMeOpen, setIsMeOpen] = useState(false);
  const [openedLiId, setOpenedLiId] = useState("");
  useEffect(() => {
    setIsMeOpen(isOpen);
  }, [isOpen]);

  // Evente -- >
  const onLogoutCaller = () => {
    try {
      onLogout();
    } catch (err) {
      console.log(err);
    }
  };
  const onCloseCaller = () => {
    setIsMeOpen(false); // internal set state
    try {
      onClose(false);
    } catch (err) {
      console.log(err);
    }
  };
  const onDarkCaller = () => {
    try {
      onDark("dark");
    } catch (err) {
      console.log(err);
    }
  };
  const onLightCaller = () => {
    try {
      onLight("light");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`
      flex
      flex-col
      font-dana-md
      overflow-y-auto
      _840:hidden
      w-[230px]
      h-screen
      px-6
      py-[18px]
      bg-secondary-light
      dark:bg-secondary-dark/70
      dark:backdrop-blur-md
      fixed
       z-20
       top-0
       right-0
       transition-[_transform_opacity]
       will-change-transform
       ${isMeOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
       `}
      >
        {/* Header section */}
        <section className="mb-5">
          {/* Logo , close button and theme button */}
          <div className="flex justify-between items-center">
            <aside>
              <Logo onClick={onCloseCaller} className="w-10 h-10" />
            </aside>
            <aside className=" flex items-center gap-x-2">
              {/* Dark lighrt button */}
              <div className="text-dark/80 dark:text-light/80">
                <Button
                  onClick={onDarkCaller}
                  className="dark:hidden block accent-outline rounded-full"
                >
                  <HiMoon className="w-4 h-4" />
                </Button>
                <Button
                  onClick={onLightCaller}
                  className="dark:block hidden accent-outline rounded-full"
                >
                  <HiOutlineSun className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={onCloseCaller}
                className="accent-outline rounded-full"
              >
                <HiX className="w-4 h-4" />
              </Button>
            </aside>
          </div>
        </section>
        {/* menus (Body section) */}
        <section className=" text-dark dark:text-light text-sm ">
          {/* Quick Access (Statick) */}
          {isLogin && (
            <div className="space-y-3 mb-2">
              <span className="block">دسترسی سریع : </span>
              <Button
                to={fromUser(userPanel.my_courses)}
                className="accent-outline !p-1.5 text-sm justify-between w-full"
                onClick={onCloseCaller}
              >
                <h1>دوره های من</h1>
                <HiOutlineArrowCircleLeft />
              </Button>
              <Button
                to={fromUser(userPanel.tickets)}
                className="accent-outline !p-1.5 text-sm justify-between w-full"
                onClick={onCloseCaller}
              >
                <h1>تیکت های من</h1>
                <HiOutlineArrowCircleLeft />
              </Button>
              <Button
                to={fromUser(userPanel.user_details)}
                className="accent-outline !p-1.5 text-sm justify-between w-full"
                onClick={onCloseCaller}
              >
                <h1>حساب کاربری</h1>
                <HiOutlineArrowCircleLeft />
              </Button>
            </div>
          )}
          {/* Categories */}
          <ul className="space-y-3">
            <span className="block">دسته بندی ها :</span>
            {navigateList?.map((li, index) => {
              let indexPlused = index + 1;
              return (
                <li key={indexPlused}>
                  {/* Button Section */}
                  <div className="text-sm flex items-center justify-between">
                    {/* Link to navigate if it has */}
                    {li?.href ? (
                      <NavLink
                        onClick={onCloseCaller}
                        to={getLink({
                          clientRoute: "category/",
                          href: li?.href,
                        })}
                      >
                        <h1>{li?.title}</h1>
                      </NavLink>
                    ) : (
                      <h1 onClick={onCloseCaller}>{li?.title}</h1>
                    )}
                    {/* // Icon to open the submenus if it has -->  */}
                    {li?.submenus?.length ? (
                      <RippleButton
                        className="accent-outline p-2 rounded-full"
                        buttonProps={{
                          onClick: () =>
                            setOpenedLiId((prev) =>
                              prev == indexPlused ? "" : indexPlused
                            ),
                        }}
                      >
                        <HiOutlineArrowCircleLeft />
                      </RippleButton>
                    ) : null}
                  </div>
                  {/* Submenus Section - > */}
                  {openedLiId == indexPlused && (
                    <ul className="w-full space-y-3 p-2">
                      {li?.submenus?.map((sub, index) => {
                        return (
                          <NavLink
                            key={index}
                            onClick={onCloseCaller}
                            to={"/main/course-info/" + sub?.href}
                            end
                          >
                            {sub?.title}
                          </NavLink>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Logout button (Foter section) */}
        <section className="pt-3 mt-auto">
          <Button
            to={`${isLogin ? "" : fromMain(Main.login)}`}
            onClick={() => {
              if (isLogin) {
                onLogoutCaller();
                onCloseCaller();
              }
            }}
            className="accent-outline text-sm w-full"
          >
            {isLogin ? "خروج از حساب" : "ورود به حساب"}
          </Button>
        </section>
      </div>

      {/* BackCover when menu is open */}
      <div
        onClick={onCloseCaller}
        className={`w-full h-screen fixed top-0 left-0 z-[15]
         ${backCover ? "bg-black/50" : "bg-transparent"}
        ${isMeOpen ? "block" : "hidden"}`}
      ></div>
    </>
  );
}
