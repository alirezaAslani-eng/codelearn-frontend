import { useContext, useEffect, useState } from "react";
import { HiX, HiMoon, HiOutlineSun } from "../../Ui/icons/icons";
import { Button, Logo } from "../../Ui";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context";
const defProps = {
  onClose: () => {},
  onDark: () => {},
  onLight: () => {},
  onLogout: () => {},
  data: [{ text: "", link: "", arrowIcon: <></>, textIcon: <></> }],
};

function UserSideBarMobile({
  open = false,
  onClose = defProps.onClose,
  onDark = defProps.onDark,
  onLight = defProps.onLight,
  onLogout = defProps.onLogout,
  data = defProps.data,
  date = "",
  backCover = true,
}) {
  const [isMounted, setMounted] = useState(false);
  const { userInfo } = useContext(AuthContext);
  useEffect(() => {
    setMounted(open || false);
  }, [open]);
  // Events ---- >
  const closeHandler = () => {
    setMounted(false);
    try {
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  const onLightHandler = () => {
    try {
      onLight();
    } catch (err) {
      console.log(err);
    }
  };
  const onDarkHandler = () => {
    try {
      onDark();
    } catch (err) {
      console.log(err);
    }
  };
  const logOutHandler = () => {
    try {
      onLogout();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
            transition-[_transform_opacity]
            will-change-transform
            ${
              isMounted
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }
       `}
        >
          {/* Header section */}
          <section className="mb-5">
            {/* Logo , close button and theme button */}
            <div className="flex justify-between items-center">
              {/* Close Button */}
              <Button
                onClick={closeHandler}
                className="accent-outline rounded-full"
              >
                <HiX className="w-4 h-4" />
              </Button>
              <Logo onClick={closeHandler} className="w-10 h-10" />
            </div>
            {/* User Name box  */}
            <div className="p-3 mt-5 space-y-2 text-center font-dana-md text-xs [&>span]:block bg-bg-accent rounded-lg text-dark">
              <span>{userInfo?.name || ""}</span>
              {/* Date */}
              <span>{date}</span>
            </div>
          </section>
          {/* menus (Body section) */}
          <section className=" text-dark dark:text-light text-sm ">
            {data?.map((item, index) => {
              return (
                <div
                  key={item?._id || index}
                  onClick={closeHandler}
                  className="border-secondary-dark/40 border-b dark:border-secondary-light/40 last:!border-transparent"
                >
                  <NavLink to={item?.link || ""}>
                    <MenuButton {...item} />
                  </NavLink>
                </div>
              );
            })}
          </section>

          {/* Logout button (Foter section) */}
          <section className="pt-3 mt-auto">
            <Button
              onClick={() => {
                logOutHandler();
                closeHandler();
              }}
              className="accent-outline text-sm w-full"
            >
              {"خروج از حساب"}
            </Button>
          </section>
        </div>
        {/* BackCover when menu is open */}
        {isMounted && (
          <div
            onClick={closeHandler}
            className={`w-full h-screen fixed top-0 left-0 z-10
            ${backCover ? "bg-black/50" : "bg-transparent"} `}
          ></div>
        )}
      </>
    </>
  );
}

function MenuButton({ textIcon = <></>, arrowIcon = <></>, text = "" }) {
  return (
    <div className="flex items-center justify-between py-4">
      <aside className="flex items-center gap-x-2">
        <div>{textIcon}</div>
        <div>{text}</div>
      </aside>
      <aside>{arrowIcon}</aside>
    </div>
  );
}

export default UserSideBarMobile;
