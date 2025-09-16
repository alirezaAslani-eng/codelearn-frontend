import { useContext, useRef, useState } from "react";
import {
  fromUser,
  userPanel,
  fromMain,
  Main,
} from "../../../routes/clientPath";
import { v4 as uuid } from "uuid";
import { NavLink, useLocation } from "react-router-dom";
// custom hook
import { useScrollEffect } from "../../../hooks/index";
// icons
import {
  HiOutlineHome,
  HiCode,
  HiOutlineDocumentDuplicate,
  HiOutlineShoppingBag,
  HiQuestionMarkCircle,
} from "../../Ui/icons/icons";
import { AuthContext, ToggleActionsContext } from "../../../context";
import { useMediaQuery } from "@mui/material";
import { isActiveLink } from "../../../utils";
const data = [
  {
    id: uuid(),
    text: "صفحه اصلی",
    icon: <HiOutlineHome className="size-6" />,
    link: "/" + Main.root,
  },
  {
    id: uuid(),
    text: "دوره ها",
    icon: <HiCode className="size-6" />,
    link: fromMain(Main.courses),
  },
  {
    id: uuid(),
    text: "مقالات",
    icon: <HiOutlineDocumentDuplicate className="size-6" />,
    link: fromMain(Main.blogs),
  },
  {
    id: uuid(),
    text: "پشتیبانی",
    icon: <HiQuestionMarkCircle className="size-6" />,
    link: fromMain(Main.chat),
  },
];
export default function BottomBar() {
  // state -- .
  const [isUp, setIsUp] = useState(false);
  // ref
  const bottomBarRef = useRef(null);
  // custom hook
  useScrollEffect(
    bottomBarRef,
    200,
    () => setIsUp(false),
    () => setIsUp(true)
  );
  // context to access to chat box -- >
  const { chatBoxHandler } = useContext(ToggleActionsContext);
  const { isLogin } = useContext(AuthContext);
  // variables
  const isHome = useLocation().pathname == "/" + Main.root;
  const isMobile = useMediaQuery("(max-width:840px)");

  return (
    <>
      {isMobile && (
        <div
          ref={bottomBarRef}
          className={`
        bg-secondary-light 
        dark:bg-secondary-dark
        shadow 
        border-t 
        border-light
        dark:border-dark
        h-[60px] 
        w-full 
        sticky 
        bottom-0 
        right-0 
        z-10 
        px-5 
        _840:hidden  
        transition-[_opacity_transform] 
        will-change-transform 
        ${isUp ? "up" : "down"}
        ${!isHome && "!opacity-100 !translate-y-0"}
        `}
        >
          <div className=" flex items-center justify-between h-full font-dana-md ">
            {data.map((item) => {
              if (!item?.link) {
                return (
                  <div
                    key={item.id}
                    onClick={() => chatBoxHandler(true)}
                    className="flex flex-col justify-center items-center text-xs gap-y-1 transition-all text-center"
                  >
                    {item.icon}
                    <p className="">{item.text}</p>
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.id}
                  to={item.link}
                  end
                  className={({ isActive }) =>
                    isActiveLink({
                      isActive,
                      defaultCalssName:
                        "flex flex-col justify-center items-center text-xs gap-y-1 transition-all text-center",
                      actived: "text-bg-accent",
                      notActived: "text-dark/80 dark:text-light/80",
                    })
                  }
                >
                  {item.icon}
                  <p className="">{item.text}</p>
                </NavLink>
              );
            })}
            {isLogin && (
              <NavLink
                to={fromUser(userPanel.user_carts)}
                className={({ isActive }) =>
                  isActiveLink({
                    isActive,
                    defaultCalssName:
                      "flex flex-col justify-center items-center text-xs gap-y-1 transition-all text-center",
                    actived: "text-bg-accent",
                    notActived: "text-dark/80 dark:text-light/80",
                  })
                }
              >
                <HiOutlineShoppingBag className="size-6" />
                <p className="">سبد خرید</p>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
}
