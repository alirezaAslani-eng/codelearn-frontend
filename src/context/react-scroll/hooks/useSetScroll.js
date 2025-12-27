// ! Dependencies //////////////////////////////////////////////////// >
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ScrollStateContext } from "../ScrollStateContext";
import { useLocation } from "react-router-dom";
import { useEffectEvent } from "react";
import { debounce } from "@mui/material";

// ! Dependencies //////////////////////////////////////////////////// <

export default function useSetScroll({ alwaysTop = [] } = {}) {
  const { addScrollState, scrollStates } = useContext(ScrollStateContext);
  const { pathname } = useLocation();

  /**
   * this ref contains the scrollY value
   * it get reset while navigating
   */
  const scrollRef = useRef(0);
  /**
   * this constant can be true or false based on the pathname
   */
  const isAlwaysTop = alwaysTop.includes(finder(scrollStates, pathname)?.[0]);
  /**
   * handler of scroll listener, it updates scrollRef while scrolling with 300ms delay
   */
  const scrollHandler = debounce(() => {
    scrollRef.current = window.scrollY;
  }, 300);
  /**
   * this method applies the restored scroll while changing pathname
   * from existed state in ScrollStateProvider
   */
  const applyScroll = useEffectEvent(() => {
    // * find page's scroll state =============================== >
    const myState = finder(scrollStates, pathname);
    // * apply it ============ >
    window.scrollTo(0, myState?.[1].y ?? 0);
  });
  /**
   * restore and apply page's scroll state while changing pathname
   */
  useEffect(() => {
    if (isAlwaysTop) {
      scrollGoTop();
      return;
    }

    applyScroll();
    window.addEventListener("scroll", scrollHandler);

    return () => {
      if (isAlwaysTop) {
        scrollGoTop();
        return;
      }
      window.removeEventListener("scroll", scrollHandler);
      addScrollState({ path: pathname, scroll: { y: scrollRef.current } });
      scrollRef.current = 0;
    };
  }, [pathname]);
}

function finder(array, findeBaseOn) {
  return array.find((arr) => {
    return arr[0] == findeBaseOn;
  });
}
function scrollGoTop() {
  window.scrollTo(0, 0);
}
