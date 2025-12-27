// ! Dependencies //////////////////////////////////////////////////// >
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ScrollStateContext } from "../ScrollStateContext";
import { useLocation } from "react-router-dom";
import { useEffectEvent } from "react";
import { debounce } from "@mui/material";
// ! Dependencies //////////////////////////////////////////////////// <

function finder(array, findeBaseOn) {
  return array.find((arr) => {
    return arr[0] == findeBaseOn;
  });
}
  const { addScrollState, scrollStates } = useContext(ScrollStateContext);
  const { pathname } = useLocation();

  /**
   * this ref contains the scrollY value
   * it get reset while navigating
   */
  const scrollRef = useRef(0);
  /**
   * handler of scroll listener, it updates scrollRef while scrolling with 300ms delay
   */
  const scrollHandler = debounce(() => {
    scrollRef.current = window.scrollY;
    console.log(scrollRef.current);
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
    applyScroll();
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      addScrollState({ path: pathname, scroll: { y: scrollRef.current } });
      console.log("unmounted-last-scroll-state", scrollRef.current);
      scrollRef.current = 0;
    };
  }, [pathname]);
}
