import { useContext, useEffect } from "react";
import { BreadCrumpContext } from "../context";
import { HiOutlineHome } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import { Main } from "../routes/clientPath";

export default function useBreadCrump({
  breadCrumpArray = [{ text: "", link: "" }],
}) {
  const { setBreadCrumpAddress } = useContext(BreadCrumpContext);
  const { pathname } = useLocation();
  useEffect(() => {
    setBreadCrumpAddress([
      { text: <HiOutlineHome className="size-5" />, link: "/" + Main.root },
      ...breadCrumpArray,
    ]);
    return () => {
      setBreadCrumpAddress([]);
    };
  }, [pathname]);
}
