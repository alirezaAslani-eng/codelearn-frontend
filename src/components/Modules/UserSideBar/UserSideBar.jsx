import { useContext } from "react";
import { AuthContext } from "../../../context";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineArrowCircleLeft } from "../../Ui/icons/icons";
import { Button } from "../../Ui";
import { Main } from "../../../routes/clientPath";
const defProps = {
  data: [
    {
      text: "ارسال تیکت",
      link: "",
      arrowIcon: <></>,
      linkIcon: <></>,
    },
  ],
};
export default function UserSideBar({ data = defProps.data, date = "" }) {
  const { userInfo, logout } = useContext(AuthContext);
  const navigator = useNavigate();
  return (
    <aside
      className="
      flex
      flex-col
      overflow-y-auto
    py-[18px] 
    h-screen 
    bg-secondary-light 
    dark:bg-secondary-dark 
    text-dark 
    dark:text-light 
    sticky top-0 
    z-[5] 
    font-dana-md
    
    "
    >
      <Button
        to={"/" + Main.root}
        className="accent-outline rounded-full w-fit mr-6 !p-2.5"
      >
        <HiOutlineArrowCircleLeft className="rotate-180" />
        <p className="text-sm">برگشت</p>
      </Button>
      {/* Header section */}
      <section className="px-6 mt-4">
        <div className=" w-full  font-dana-md ">
          <section>
            {/* User name and date */}
            <div className=" p-5 w-[211px] text-dark/95 bg-bg-accent rounded-lg ">
              <div className="flex text-center items-center flex-col gap-y-3">
                <p className="text-sm">{userInfo?.name}</p>
                <span className="text-xs block">{date}</span>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/* Menu */}
      <section className="px-6 mt-4 text-sm">
        {data?.map((menu, index) => {
          return (
            <NavLink
              key={index}
              to={menu.link}
              className={(link) => {
                return ` py-6 block w-full  border-b last:!border-transparent border-secondary-dark/50 dark:border-secondary-light/50  ${
                  link.isActive ? "text-text-accent dark:text-bg-accent" : ""
                }`;
              }}
            >
              <div className="flex justify-between items-center">
                <aside className="flex items-center gap-x-2">
                  {menu.linkIcon} {menu.text}
                </aside>
                <aside>{menu?.arrowIcon}</aside>
              </div>
            </NavLink>
          );
        })}
      </section>
      <section className="px-6 mt-auto">
        {/* Log out button  */}
        <button
          className={
            "py-4 px-3 rounded-lg block bg-red-500/20 text-red-500 w-full"
          }
          onClick={() => {
            navigator("/" + Main.root);
            logout();
          }}
        >
          <div className="flex justify-between items-center">
            <aside className="flex items-center gap-x-2">خروج</aside>
            <aside>
              <HiOutlineArrowCircleLeft />
            </aside>
          </div>
        </button>
      </section>
    </aside>
  );
}
