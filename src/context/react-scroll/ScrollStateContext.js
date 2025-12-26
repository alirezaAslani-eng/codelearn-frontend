// ! Dependencies //////////////////////////////////////////////////// <
import { useEffectEvent } from "react";
import { createContext, useCallback, useState } from "react";
// ! Dependencies //////////////////////////////////////////////////// <
const ScrollStateContext = createContext({
  addScrollState: ({ path = "", scrll = { y: 0 } }) => {},
  scrollStates: [["", { y: 0 }]],
});
const uniqScrollStates = new Map();
export default function ScrollStateProvider({ children }) {
  // this state contain states of scroll-y per page . each page set it's scroll state while unmounting and find it form here while mounting
  const [scrollStates, setScrollStates] = useState([]);
  // this map contains scroll states to make theme uniq because a page dosen't unmount for once and its path set again if we dont use Map
  // this function add or update states

  const addScrollState = useEffectEvent(
    /**
     * @param {{path:string,scroll:{y:number}}} param0
     */
    ({ path, scroll }) => {
      uniqScrollStates.set(path, scroll);
      setScrollStates([...uniqScrollStates]);
    }
  );

  const providedValue = {
    addScrollState,
    /**
     * @type {[string,{y:number}][]}
     */
    scrollStates,
  };
  return (
    <ScrollStateContext.Provider value={providedValue}>
      {children}
    </ScrollStateContext.Provider>
  );
}
export { ScrollStateProvider, ScrollStateContext };
