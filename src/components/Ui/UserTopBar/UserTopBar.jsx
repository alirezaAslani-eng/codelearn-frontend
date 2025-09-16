import { memo, useContext } from "react";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../../context";
import { Button } from "../Buttons";
import LeftAside from "../../common/TopBar/Desktop/LeftAside";
import { HiMenu, HiOutlineShoppingBag } from "../icons/icons";
import { CornerIcon } from "../../../assist/svg";
import { useMediaQuery } from "@mui/material";
import { fromUser, userPanel } from "../../../routes/clientPath";
const defProps = {
  actions: {
    onOpenMenu: () => {},
  },
};
function UserTopBar({ actions = defProps.actions }) {
  const { userInfo } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width:840px)");
  const onOpenMenuHandler = () => {
    try {
      actions?.onOpenMenu();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="
    font-dana-md 
    w-full 
    py-3 
    px-4  
    _840:py-5 
    _840:px-8 
    sticky
    top-0
    z-[10]
    flex 
    justify-between 
    items-center 
    text-dark 
    dark:text-light 
    bg-secondary-light 
    dark:bg-secondary-dark
    
    "
    >
      <aside className="flex items-center gap-x-5">
        {/* codelearn text and logo */}
        <div className="_980:border-l pl-5  _840:gap-x-4 border-secondary-dark/40 dark:border-secondary-light/40 ">
          <div className="flex items-center gap-x-4">
            {/* Menu button in mobile size before 840px */}
            <Button
              onClick={onOpenMenuHandler}
              className="accent-outline rounded-full _840:hidden"
            >
              <HiMenu className="w-4 h-4 text-dark dark:text-light " />
            </Button>
            {/* codelearn name after 840px  */}
            <div className="hidden _840:flex items-center gap-x-2 ">
              <Logo className="size-10 _840:size-12" />
              <h1 className="text-bg-accent text-base _840:text-xl font-peyda-md ">
                کد لرن
              </h1>
            </div>
          </div>
        </div>
        {/* After 840px we have this section in header */}
        <div className="hidden _980:flex text-sm _1140:text-base items-center gap-x-1 ">
          <span>{userInfo?.name}</span>
          <p className="text-dark/70 dark:text-light/70">
            عزیز خوش آمدید به پنل کاربری کد لرن
          </p>
        </div>
      </aside>

      {/* center logo for mobile */}
      <div className="block _840:hidden items-center gap-x-2 ">
        <Logo className="size-10 _840:size-12" />
      </div>
      {/* left side has cart button and dark light  */}
      <aside>
        {isDesktop && (
          <div className="flex items-center gap-x-3">
            <LeftAside search={false} user={false} />
          </div>
        )}
        {!isDesktop && (
          <Button
            to={fromUser(userPanel.user_carts)}
            className="accent-outline rounded-full _840:hidden"
          >
            <HiOutlineShoppingBag className="w-4 h-4 text-dark dark:text-light " />
          </Button>
        )}
      </aside>
      <div className="absolute bottom-0 right-0">
        <CornerIcon className="size-5 sticky top-0 text-secondary-light dark:text-secondary-dark translate-y-full" />
      </div>
      <div className="absolute bottom-0 left-0 block _840:hidden">
        <CornerIcon className="size-5 sticky top-0 text-secondary-light dark:text-secondary-dark translate-y-full -rotate-90" />
      </div>
    </div>
  );
}
export default memo(UserTopBar);
