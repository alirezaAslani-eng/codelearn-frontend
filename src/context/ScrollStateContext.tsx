import {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";
interface addScrollParam {
  path: string;
  scroll: { y: number };
}
type scrollStates = [addScrollParam["path"], { y: addScrollParam["scroll"]["y"] }][];
interface provider {
  addScrollState: (param: addScrollParam) => void;
  scrollStates: scrollStates;
}

const ScrollStateContext = createContext({} as provider);

export default function ScrollStateProvider({ children }: PropsWithChildren) {
  // this state contain states of scroll-y per page . each page set it's scroll state while unmounting and find it form here while mounting
  const [scrollStates, setScrollStates] = useState<scrollStates>([]);

  // this map contains scroll states to make theme uniq because a page dosen't unmount for once and its path set again if we dont use Map
  const uniqScrollStates = new Map<
    addScrollParam["path"], // key
    addScrollParam["scroll"] // value
  >();

  // this function add or update states
  const addScrollState = useCallback(
    ({ path, scroll }: addScrollParam): void => {
      uniqScrollStates.set(path, scroll);
      setScrollStates([...uniqScrollStates]);
    },
    []
  );

  return (
    <ScrollStateContext.Provider value={{ addScrollState, scrollStates }}>
      {children}
    </ScrollStateContext.Provider>
  );
}
export { ScrollStateProvider, ScrollStateContext };
