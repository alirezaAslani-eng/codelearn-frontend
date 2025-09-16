import { createContext } from "react";
import { useEffect, useReducer, useState } from "react";
const FilterContext = createContext({
  // actions ---- >
  startOneSearch: ({ path = "product.name", valueToSearch = "" }) => {},
  cleanSearchResult: () => {},
  setDataState: ({ data }) => {},
  startToggle: (id = "", path = "free", value = "1", isToggle = false) => {},
  startOption: ({
    path = "customer.name",
    value = "ali",
    defaultState = false,
  }) => {},
  // states --- >
  isSearching: false,
  searchedValue: { value: "", result: true },
  optionResult: { result: true },
  toggles: [{ id: "uniq", path: "product.price", value: "0", isToggle: false }],
  result: [],
});

const types = {
  toggle: "TOGGLE",
  default: "DEFAULTZ",
  customChange: "CUSTOM-CHANGE",
  option: "OPTION",
  liveSearch: "LIVE-SEARCH",
  oneSearch: "ONE-SEARCH",
  getUniq: "GET-UNIQ-DATA",
  cleanSearchResult: "CLEAN-SEARCH-RESULT",
};

function FilterProvider({ children }) {
  const [data, setData] = useState([]); // pure data
  // Start Logic --- >
  // this state (toggleItems) responsible for catching enabled check boxes as a object in a array because it maybe more than 1 check box
  const [toggleItems, setToggleItems] = useState([]);

  // (use -> (filterIsActiv) ) this state when you want to run any effect and use updated state of data !
  // (set value -> (setFilterIsActiv) ) to this state when you change the state of data !
  const [filterIsActiv, setFilterIsActiv] = useState(false);

  // activity of togling <- when user is click on checkBox .
  const [isToggleActive, setIsToggleActiv] = useState(false);

  // activity of searching <- when user is click on search button .
  const [isSearching, setIsSearching] = useState(false);

  // when you want to run manualy the logic (toggle), think of it like refetch .
  const [toggleRestart, setToggleRestart] = useState(false);

  //   MESSAGES ALERTs --- >

  // handling result of a serach action.
  const [searchedValue, setSearchedValue] = useState({
    result: true,
    value: "",
  });
  // handling result of a serach action.
  const [optionResult, setOptionResult] = useState({
    result: true,
  });

  // Reducer to apply state on initial data === >
  const [changedModel, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case types.toggle: {
          const result = toggleItems
            .map((toggle) => {
              // apply filter on real (data from parametr)
              return data.filter((item) => {
                const value = getValueBasedOnPath({
                  obj: item,
                  path: toggle?.path,
                });
                return value == toggle?.value;
              });
            })
            ?.flat();
          if (!result || !result?.length) {
            return { ...state, filteredData: data }; // if we dont have any filter , set original data
          }
          return { ...state, filteredData: result }; // change form of data based on toggle filter
        }
        case types.option: {
          const result = data?.filter((item) => {
            const value = getValueBasedOnPath({
              obj: item,
              path: action.peyload.path,
            });
            return value == action.peyload.value;
          });
          if (result && result?.length) {
            setOptionResult({ result: true });
            return { ...state, filteredData: result };
          } else {
            setOptionResult({ result: false });
            return { ...state, filteredData: [] };
          }
        }
        case types.liveSearch: {
          const result = data?.filter((item) => {
            const value = getValueBasedOnPath({
              obj: item,
              path: action.peyload.path,
            })?.toLowerCase();

            return value?.includes(action.peyload.valueToSearch?.toLowerCase());
          });
          if (!result || !result?.length) {
            return { ...state, filteredData: data };
          }

          return {
            ...state,
            filteredData: result,
          };
        }
        case types.oneSearch: {
          const result = data?.filter((item) => {
            const value = getValueBasedOnPath({
              obj: item,
              path: action.peyload.path,
            })?.toLowerCase();
            return value?.includes(action.peyload.valueToSearch?.toLowerCase());
          });
          if (!result?.length) {
            setSearchedValue({
              value: action.peyload.valueToSearch,
              result: false,
            });
            return { ...state, filteredData: [] };
          }
          setSearchedValue({
            value: action.peyload.valueToSearch,
            result: true,
          });
          return {
            ...state,
            filteredData: result,
          };
        }
        case types.cleanSearchResult: {
          setSearchedValue({ result: true, value: "" }); // reset serach result state
          return { ...state, filteredData: data };
        }
        case types.getUniq: {
          const uniqItems = uniqer({
            arry: state.filteredData,
            key: "_id",
          });
          return { ...state, filteredData: uniqItems }; // set default data from parametr
        }
        case types.customChange: {
          return { ...state, filteredData: action.peyload.value };
        }
        case types.default: {
          return { ...state, filteredData: data }; // set default data from parametr
        }
        default: {
          return state;
        }
      }
    },
    {
      filteredData: [],
    }
  );

  const runActivity = () => {
    // when we have any changes in our state we shoud call this method to update the use-effects .
    setFilterIsActiv((prev) => !prev);
  };
  const restartToggling = () => {
    setToggleRestart((prev) => !prev);
  };

  useEffect(() => {
    // if we have any changed in state of data we shoud make it uniq .
    dispatch({ type: types.getUniq });
  }, [filterIsActiv]);

  useEffect(() => {
    // when add a toggle object like this { id,path,value,isToggle}, this hook going to update the state
    dispatch({ type: types.toggle });
    runActivity();
  }, [toggleItems, toggleRestart]);

  useEffect(() => {
    // This Effect responsible for clear disabled toggle in (toggleItems) and kepping only enabled checkBox
    const disabledToggles = toggleItems?.find((item) => !item.isToggle); // first, get disabled checkBox
    if (disabledToggles) {
      // if (disabledToggles) has disabled items -> isToggle=false
      const onlyEnabledToggles = toggleItems.filter((toggle) => {
        // remove all the objects that has same id with this disabled toggle
        return toggle?.id != disabledToggles?.id;
      });
      // update toggles .
      setToggleItems(onlyEnabledToggles);
    }
  }, [isToggleActive]);

  const cleanSearchResult = () => {
    dispatch({ type: types.cleanSearchResult });
    setIsSearching(false);
    restartToggling(); // apply enabled toggles .
    runActivity(); // update effects
  };

  const startToggle = ({
    id = "",
    path = "free",
    value = "1",
    isToggle = false,
  }) => {
    setIsToggleActiv((prev) => !prev);
    setToggleItems((prev) => [...prev, { id, path, value, isToggle }]);
  };

  const startOption = ({
    path = "customer.name",
    value = "ali",
    defaultState = false,
  } = {}) => {
    if (defaultState) dispatch({ type: types.default });
    else dispatch({ type: types.option, peyload: { value, path } });
  };

  const startLiveSearch = ({
    path = "product.name",
    valueToSearch = "lenovo",
  }) => {
    if (!valueToSearch?.trim()) {
      dispatch({ type: types.default });
      return;
    }
    dispatch({
      type: types.liveSearch,
      peyload: { path, valueToSearch },
    });
  };

  const startOneSearch = ({
    path = "product.name",
    valueToSearch = "lenovo",
  } = {}) => {
    if (!valueToSearch?.trim()) {
      dispatch({ type: types.default });
      return;
    }
    setIsSearching(true);
    dispatch({ type: types.oneSearch, peyload: { path, valueToSearch } });
  };

  const setDataState = ({ data }) => {
    setData(data);
    dispatch({ type: types.customChange, peyload: { value: data } });
    restartToggling();
    runActivity();
  };

  return (
    <FilterContext.Provider
      value={{
        // actions ---- >
        startToggle,
        startLiveSearch,
        startOneSearch,
        cleanSearchResult,
        setDataState,
        startOption,
        // states --- >
        isSearching,
        searchedValue,
        optionResult,
        toggles: toggleItems,
        result: changedModel?.filteredData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext };

const getValueBasedOnPath = ({ obj, path }) => {
  const value = path?.split(".")?.reduce((acc, key) => acc?.[key], obj);
  return value;
};
const uniqer = ({ arry = [], key = "_id" } = {}) => {
  const seen = new Set();
  const uniqItems = arry.filter((item) => {
    if (seen.has(item?.[key])) {
      return false; // return noting
    } else {
      seen.add(item?.[key]);
      return true; // return item
    }
  });
  return uniqItems;
};
