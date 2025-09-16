import { useState } from "react";
import { v4 as uuid } from "uuid";
import { HiX, HiOutlineSearch } from "../icons/icons";
import { Opacity } from "../../Modules";
import { AnimatePresence } from "framer-motion";
import { Switch } from "../index";
const checkBoxId = uuid();
const defProps = {
  onSearch: () => {},
  onCancelSearch: () => {},
  onChecked: () => {},
  free: true,
  search: true,
  category: true,
  preSale: true,
  isSearching: false,
  toggleStates: [],
};
function SideBarFilter({
  // Events --- >
  onChecked = defProps.onChecked,
  onSearch = defProps.onSearch,
  onCancelSearch = defProps.onCancelSearch,
  // which option do you want -- >
  free = defProps.free,
  search = defProps.search,
  category = defProps.category,
  preSale = defProps.preSale,
  // needed states -- >
  toggleStates = defProps.toggleStates,
  isSearching = defProps.isSearching,
}) {
  const [serachValue, setSearchValue] = useState("");

  const userClickedOnSearch = () => {
    try {
      onSearch({ value: serachValue });
    } catch (err) {
      console.log(err);
    }
  };

  const checkedHandler = ({ isToggle, path = "", value = "", id = "" }) => {
    try {
      onChecked({ isToggle, path, value, id });
    } catch (err) {
      console.log(err);
    }
  };

  const searchCancelHandler = () => {
    setSearchValue("");
    try {
      onCancelSearch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full font-dana-md space-y-4 text-dark dark:text-light">
      {/* Public Filter */}
      {search && (
        <div className=" p-2 bg-secondary-light dark:bg-secondary-dark shadow rounded-lg ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex items-stretch">
              <AnimatePresence>
                {isSearching && (
                  <button type="button" onClick={searchCancelHandler}>
                    <Opacity className="p-2 mx-2 self-center w-fit bg-red-500/20  text-red-500 rounded-lg">
                      <HiX />
                    </Opacity>
                  </button>
                )}
              </AnimatePresence>
              <input
                className="block flex-1 min-w-0 bg-transparent pl-1 pr-1 "
                placeholder="جستجو"
                value={serachValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
              />
              <button
                type="submit"
                onClick={userClickedOnSearch}
                className="accent-outline"
              >
                <HiOutlineSearch />
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Course Filtering */}
      {free && (
        <div className="p-3 bg-secondary-light dark:bg-secondary-dark shadow rounded-lg ">
          <Switch
            label={"فقط رایگان ها"}
            props={{
              checked: toggleStates?.some((item) => item?.id == 1),
              disabled: isSearching,
              onChange: (e) =>
                checkedHandler({
                  id: "1",
                  isToggle: e.target.checked,
                  path: "price",
                  value: "0",
                }),
            }}
          />
        </div>
      )}
      {/* Course Filtering */}
      {preSale && (
        <div className="p-3 bg-secondary-light dark:bg-secondary-dark shadow rounded-lg ">
          <Switch
            label={"پیش فروش"}
            props={{
              checked: toggleStates?.some((item) => item?.id == 2),
              disabled: isSearching,
              onChange: (e) =>
                checkedHandler({
                  id: "2",
                  isToggle: e.target.checked,
                  path: "isComplete",
                  value: "0",
                }),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SideBarFilter;
