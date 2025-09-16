import { memo, useState } from "react";
import { HiOutlineSearch, HiOutlineMenuAlt3, HiX } from "../icons/icons";
import { Button } from "../Buttons";
import { MenuBox } from "../../common";
import { Opacity } from "../../Modules";
import { AnimatePresence } from "framer-motion";
import Switch from "../Switch/Switch";

const defProps = {
  onChecked: () => {},
  onSearch: () => {},
  onCancelSearch: () => {},
  toggleStates: [],
  isSearching: false,
};
function FilterBarMobile({
  onChecked = defProps.onChecked,
  onSearch = defProps.onSearch,
  onCancelSearch = defProps.onCancelSearch,
  toggleStates = defProps.toggleStates,
  isSearching = defProps.isSearching,
  // ui rendering -- >
  hasMenuButton = true,
  // which option do you want -- >
  preSale = true,
  free = true,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);
  // Filter actions ----- >
  const closeFilterMenu = () => {
    setFilterMenu(false);
  };
  const toggleFilterMenu = () => {
    setFilterMenu((prev) => !prev);
  };
  // checkBox Actions --- >
  const chekBoxHandler = ({ isToggle, path, value, id }) => {
    try {
      onChecked({ isToggle, path, value, id });
    } catch (err) {
      console.log(err);
    }
  };
  // submit search --- >
  const submitSearch = (e) => {
    e.preventDefault();
    try {
      onSearch({ value: searchValue });
    } catch (err) {
      console.log(err);
    }
  };
  // when user click on cancel searching or trun input to empty !
  const serachCancelHandler = () => {
    setSearchValue("");
    try {
      onCancelSearch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="w-full space-y-4 font-dana-md ">
        <div className="flex items-stretch gap-x-4 ">
          {/* Filter button ----- > */}
          {hasMenuButton && (
            <div
              className="relative"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button
                onClick={toggleFilterMenu}
                className="accent-outline rounded-full relative h-full w-[50px]"
              >
                <HiOutlineMenuAlt3 className="size-6" />
              </Button>
              {/* CheckBox Items */}
              <div className="absolute z-[3] top-[calc(100%+16px)] right-0 w-[200px]">
                <MenuBox
                  zIndex_backcover={2}
                  onClose={closeFilterMenu}
                  isOpen={filterMenu}
                  backCover={false}
                >
                  <div className="p-3 text-dark dark:text-light text-sm space-y-3">
                    {free && (
                      <Switch
                        label={"فقط رایگان ها"}
                        props={{
                          checked: toggleStates?.some((item) => item?.id == 1),
                          disabled: isSearching,
                          onChange: (e) =>
                            chekBoxHandler({
                              id: "1",
                              isToggle: e.target.checked,
                              path: "price",
                              value: "0",
                            }),
                        }}
                      />
                    )}
                    {preSale && (
                      <Switch
                        label={"پیش فروش ها"}
                        props={{
                          checked: toggleStates?.some((item) => item?.id == 2),
                          disabled: isSearching,
                          onChange: (e) =>
                            chekBoxHandler({
                              id: "2",
                              isToggle: e.target.checked,
                              path: "isComplete",
                              value: "0",
                            }),
                        }}
                      />
                    )}
                  </div>
                </MenuBox>
              </div>
            </div>
          )}
          {/* Search Input  */}
          <aside className="flex-1 min-w-0">
            <form onSubmit={submitSearch}>
              <div className="flex items-center gap-x-2 p-1.5 pl-2 rounded-lg bg-secondary-light dark:bg-secondary-dark shadow border border-secondary-dark/10 dark:border-secondary-light/10">
                <AnimatePresence>
                  {isSearching && (
                    <button type="button" onClick={serachCancelHandler}>
                      <Opacity className="text-red-500 bg-red-500/20 p-1 rounded-lg">
                        <HiX />
                      </Opacity>
                    </button>
                  )}
                </AnimatePresence>
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="جستجو"
                  type="text"
                  className="bg-transparent block flex-1 min-w-0 text-sm rounded-lg p-2 text-dark dark:text-light placeholder-dark/80 dark:placeholder-light/80 "
                />

                <button type="submit" className="text-dark dark:text-light">
                  <HiOutlineSearch />
                </button>
              </div>
            </form>
          </aside>
        </div>
      </section>
    </>
  );
}
export default memo(FilterBarMobile);
