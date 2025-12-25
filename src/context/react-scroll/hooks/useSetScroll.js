// ! Dependencies //////////////////////////////////////////////////// >
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ScrollStateContext } from "../ScrollStateContext";
import { useLocation } from "react-router-dom";
import { useEffectEvent } from "react";
import { debounce } from "@mui/material";
// ! Dependencies //////////////////////////////////////////////////// <

export default function useSetScroll({ alwaysTop = false } = {}) {
  const { addScrollState, scrollStates } = useContext(ScrollStateContext);
  const { pathname } = useLocation();

  const scrollRef = useRef(0);

  const scrollHandler = debounce(() => {
    scrollRef.current = window.scrollY;
    console.log(scrollRef.current);
  }, 300);

  const applyScroll = useEffectEvent(() => {
    // * find my scroll state =============================== >
    const myState = scrollStates.find((arr) => {
      return arr[0] == pathname;
    });
    // * apply it ============ >
    window.scrollTo(0, myState?.[1].y ?? 0);
  });

  // * unmount (old path - remove listener) / mount (apply listener)
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
