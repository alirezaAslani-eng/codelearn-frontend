import { NavLink } from "react-router-dom";
// icons
import { HiChevronLeft } from "../../../Ui/icons/icons";
import { getLink } from "../../../../utils";
import { fromMain, Main } from "../../../../routes/clientPath";

function MenuList({ data }) {
  return (
    <>
      <li className="text-dark dark:text-light cursor-pointer">
        <NavLink
          className={"hover:text-bg-accent transition-all animate-initialShow"}
          to={"/" + Main.root}
          end
        >
          {"صفحه اصلی"}
        </NavLink>
      </li>
      <li className="text-dark dark:text-light cursor-pointer">
        <NavLink
          className={"hover:text-bg-accent transition-all animate-initialShow"}
          to={fromMain(Main.blogs)}
        >
          {"مقاله"}
        </NavLink>
      </li>
      {data?.map((li) => {
        return (
          <li
            key={li?._id}
            className="text-dark dark:text-light group relative cursor-pointer"
          >
            <NavLink
              className={
                "hover:text-bg-accent transition-all  animate-initialShow"
              }
              to={getLink({
                clientRoute: fromMain(`${Main.category}/`),
                href: li?.href,
              })}
            >
              {li?.title}
            </NavLink>
            <div
              className="
            absolute 
            pt-[40px] 
            top-[10px] 
            opacity-0 
            scale-100 
            invisible 
            group-hover:visible 
            group-hover:opacity-100 
            group-hover:scale-[.95] 
            transition-all 
            will-change-transform 
            delay-75 "
            >
              <ul
                className="
              text-sm  
              w-[200px] 
              h-[250px] 
              overflow-y-auto 
              cs-scroll
              bg-secondary-light 
              dark:bg-secondary-dark 
              text-dark 
              dark:text-light 
              empty:hidden 
              overflow-hidden "
              >
                {li?.submenus &&
                  li?.submenus.map((li) => {
                    return (
                      <li
                        key={li?._id}
                        className="
                      cursor-pointer 
                      border-r-[3px] 
                      border-transparent 
                      hover:border-bg-accent
                      dark:hover:text-bg-accent 
                      hover:bg-bg-accent/20 
                      hover:text-text-accent 
                      transition-all "
                      >
                        <NavLink
                          className={
                            " py-3 px-2 flex items-center justify-between gap-x-2"
                          }
                          to={"/main/course-info/"+li?.href}
                        >
                          {li?.title}
                          <HiChevronLeft className="min-w-[14px] min-h-[14px]" />
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
        );
      })}
      <li className="text-dark dark:text-light cursor-pointer">
        <NavLink
          className={"hover:text-bg-accent transition-all animate-initialShow"}
          to={fromMain(Main.contact)}
        >
          {"ارتباط با ما"}
        </NavLink>
      </li>
    </>
  );
}

export default MenuList;
