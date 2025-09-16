import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { debounce, useMediaQuery } from "@mui/material";
export default function useScrollEffect(
  el, // element (Ref)
  brakePointScroll, // number
  prevEffect, // method
  nextEffect // method
) {
  const [isBeforeBrakePoint, setBeforeBrakePoint] = useState(false); // Before brake point status
  const [isAfterBrakePoint, setAfterBrakePoint] = useState(false); // After brake point status
  const url = useLocation();
  const isDesktop = useMediaQuery("(min-width:840px)");
  useEffect(() => {
    const scrollHandler = () => {
      if (!el.current) return;
      const scrollTop = Math.max(0, window.scrollY); // avoiding to get a value less than 0
      const elementHeight = el.current.clientHeight; // your element height that you want to apply an action on that
      // after your breake point
      if (elementHeight && scrollTop > brakePointScroll - elementHeight) {
        setAfterBrakePoint(true);
        setBeforeBrakePoint(false);
      }
      // before your breake point
      if (elementHeight && scrollTop < brakePointScroll - elementHeight) {
        setBeforeBrakePoint(true);
        setAfterBrakePoint(false);
      }
    };
    scrollHandler(); // initial

    if (isAfterBrakePoint) {
      try {
        nextEffect();
      } catch (err) {
        console.warn(err);
      }
    } else if (isBeforeBrakePoint) {
      try {
        prevEffect();
      } catch (err) {
        console.warn(err);
      }
    }
    // start process using  scrollHandler
    if (el.current) {
      window.addEventListener("scroll", debounce(scrollHandler));
    }
    // clear up
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isAfterBrakePoint, isBeforeBrakePoint, url.pathname, isDesktop]);
}

// How to use it ???
// for example you send this -> scrollEffect(topBarRef, 200, prevEffect, nextEffect);
// props explaination :

// (topBarRef) : is your (element ref) that this hook will apply your effect on it .
// (200) : is a number to make a brake point for exaple -> before 200px of top scroll this hook will apply your effect and after 200 also do that
// (prevEffect , nextEffect) : is a method that that you shoud send me, this hook will run this method, while scroll top is more than your brake point or less than it example(200)
