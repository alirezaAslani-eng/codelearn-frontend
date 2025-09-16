import { useContext, useState } from "react";
// components
import { Button } from "../../../Ui/index";
import SerachBoxHeader from "../../../Ui/SerachBox/SerachBoxHeader";
import {
  HiMenu,
  HiOutlineSearch,
  HiX,
  HiOutlineUser,
} from "../../../Ui/icons/icons";
import { AnimatePresence } from "framer-motion";
import { LoadeingErrorHandler, Opacity } from "../../../Modules";
// HOC Conecting -- >
import { HocGlobalSearch } from "../../../sharedLogic/hoc";
import { AuthContext, ToggleActionsContext } from "../../../../context";
import {
  fromMain,
  fromUser,
  Main,
  userPanel,
} from "../../../../routes/clientPath";
const SearchBox = HocGlobalSearch(SerachBoxHeader);
export default function TopBarMobile() {
  // change state between seraching and main topBar --- >
  const [isOpenSearchBox, setIsOpenSerachBox] = useState(false);
  // to open sideBar menu -- >
  const { globalSideBarHandler } = useContext(ToggleActionsContext);
  const { isLogin, isPending: userLoading } = useContext(AuthContext);

  return (
    <>
      <header className="font-dana-md bg-secondary-light dark:bg-secondary-dark sticky inset-0 z-10 block lg:hidden">
        <AnimatePresence mode="wait">
          {!isOpenSearchBox && (
            <Opacity
              key={"main-tab"}
              className="container flex justify-between items-center py-3"
            >
              <div className="flex items-center gap-x-3">
                {/* Menu Button */}
                <Button
                  onClick={() => {
                    globalSideBarHandler(true);
                  }}
                  className="accent-outline text-dark dark:text-light rounded-full"
                >
                  <HiMenu className=" size-4" />
                </Button>

                <Button
                  onClick={() => {
                    setIsOpenSerachBox(true);
                  }}
                  className="accent-outline text-dark dark:text-light rounded-full"
                >
                  <HiOutlineSearch className="size-4" />
                </Button>
              </div>
              <h1 className="text-lg py-1 px-2 rounded-xl font-peyda-md bg-bg-accent/40 text-dark dark:text-light">
                کد لرن
              </h1>
              <LoadeingErrorHandler
                isLoading={{ check: userLoading, loading: null }}
              >
                {isLogin ? (
                  <Button
                    to={fromUser(userPanel.main)}
                    className="accent-outline text-dark dark:text-light rounded-full"
                  >
                    <HiOutlineUser className=" size-4" />
                  </Button>
                ) : (
                  <Button
                    to={fromMain(Main.login)}
                    className="accent-outline text-dark dark:text-light rounded-full text-xs"
                  >
                    ورود / ثبت نام
                  </Button>
                )}
              </LoadeingErrorHandler>
            </Opacity>
          )}
          {isOpenSearchBox && (
            <Opacity
              key={"search-tab"}
              className="p-3 flex items-center gap-x-3"
            >
              <Button
                onClick={() => setIsOpenSerachBox(false)}
                className="danger-btn rounded-lg animate-initShowFromRight"
              >
                <HiX className="size-4" />
              </Button>
              <SearchBox />
            </Opacity>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
