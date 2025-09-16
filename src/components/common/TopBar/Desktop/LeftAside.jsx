import { useCallback, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// component >>
// component / common ->
import { MenuBox } from "../../index";
// component / ui ->
import { Badge, LightButton, Button, UserShortMenu } from "../../../Ui";
import SerachBoxHeader from "../../../Ui/SerachBox/SerachBoxHeader";
// icon >>
import {
  HiOutlineShoppingBag,
  HiMoon,
  HiOutlineSun,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineSearch,
} from "../../../Ui/icons/icons";
// Context -- >
import { AuthContext, CartsContext } from "../../../../context";
// utils -- >
import { themeHandler } from "../../../../utils";
import { Carts, LoadeingErrorHandler } from "../../../Modules";
// HOC Logic Conection --- >
import { HocGlobalSearch } from "../../../sharedLogic/hoc";
import { getUserShortMenu } from "../../../../constant/staticData";
import { fromMain, Main } from "../../../../routes/clientPath";
const SearchBox = HocGlobalSearch(SerachBoxHeader);
export default function LeftAside({
  user = true,
  cart = true,
  search = true,
  theme = true,
}) {
  // States ---->>
  // state / ui process / internal event >>
  const [cartIsShow, setCartIsShow] = useState(false);
  const [userMenuIsShow, setUserMenuIsShow] = useState(false);
  const [searchBoxIsShow, setSearchBoxIsShow] = useState(false);
  // Event Handler --  >>
  const toggleUserMenu = () => {
    setUserMenuIsShow((prev) => !prev);
    setCartIsShow(false);
    setSearchBoxIsShow(false);
  };
  const toggleCartBox = () => {
    setCartIsShow((prev) => !prev);
    setSearchBoxIsShow(false);
    setUserMenuIsShow(false);
  };
  const toggleSearchBox = () => {
    setSearchBoxIsShow((prev) => !prev);
    setUserMenuIsShow(false);
    setCartIsShow(false);
  };
  const authContext = useContext(AuthContext);
  const { carts } = useContext(CartsContext);

  return (
    <>
      {/* left-Aside / search-button ---> */}
      {search && (
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            onClick={toggleSearchBox}
            className="accent-outline rounded-full"
          >
            <HiOutlineSearch className="text-dark dark:text-light size-4 _840:size-6 " />
          </Button>
          <MenuBox
            className={"top-[80px] left-0 absolute w-fit"}
            onClose={() => setSearchBoxIsShow(false)}
            isOpen={searchBoxIsShow}
            zIndex_backcover={9}
          >
            <div className="w-[250px] p-3">
              <SearchBox onClose={() => setSearchBoxIsShow(false)} />
            </div>
          </MenuBox>
        </div>
      )}
      {/* left-Aside / Cart-button ---> */}
      {cart && (
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            onClick={toggleCartBox}
            className="accent-outline rounded-full"
          >
            <HiOutlineShoppingBag className="text-dark dark:text-light size-4 _840:size-6 " />
            {carts.length ? <Badge children={carts.length} /> : undefined}
          </Button>
          <MenuBox
            className={"top-[80px] z-[10] left-0 w-[319px] absolute"}
            onClose={() => setCartIsShow(false)}
            isOpen={cartIsShow}
            zIndex_backcover={9}
          >
            <Carts
              onBuy={() => {
                setCartIsShow(false);
              }}
            />
          </MenuBox>
        </div>
      )}
      {/* left-Aside / dark-light-button ---> */}
      {theme && (
        <div className="hidden _840:block">
          <Button
            onClick={() => themeHandler("dark")}
            className="accent-outline rounded-full  dark:hidden"
          >
            <HiMoon className="size-6 block" />
          </Button>
          <Button
            onClick={() => themeHandler("light")}
            className="accent-outline rounded-full  hidden dark:block"
          >
            <HiOutlineSun className="text-dark dark:text-light size-4 _840:size-6 " />
          </Button>
        </div>
      )}
      {/* left-Aside / User or login-button ----->> */}
      {user && (
        <LoadeingErrorHandler
          isLoading={{
            check: authContext.isPending,
            loading: null,
          }}
        >
          {!authContext.isLogin ? (
            <Link to={fromMain(Main.register)}>
              <LightButton className="text-sm rounded-full text-dark dark:text-light">
                <HiOutlineLogout className="text-dark dark:text-light size-4 _840:size-6 " />
                <span className="hidden sm:block">{" ورود | ثبت نام"}</span>
              </LightButton>
            </Link>
          ) : (
            // user is login -- >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={toggleUserMenu}
                className="text-sm accent-outline rounded-full"
              >
                <HiOutlineUser className="text-dark dark:text-light size-4 _840:size-6 " />
              </Button>
              <MenuBox
                className={"top-[80px] left-[0] absolute w-[278px] p-3"}
                onClose={() => setUserMenuIsShow(false)}
                isOpen={userMenuIsShow}
              >
                <UserShortMenu
                  userMenuLinks={getUserShortMenu()}
                  isAdmin={authContext?.userInfo?.role == "ADMIN"}
                  courseCount={authContext?.userInfo?.courses?.length || 0}
                  onLogout={() => {
                    authContext?.logout({ navigatePath: "/" + Main.root });
                  }}
                  userName={authContext?.userInfo?.name || ""}
                  adminRoute={""}
                />
              </MenuBox>
            </div>
          )}
        </LoadeingErrorHandler>
      )}
    </>
  );
}
