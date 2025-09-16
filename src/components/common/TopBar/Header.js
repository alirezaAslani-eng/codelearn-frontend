import { memo } from "react";
import TopBar from "./Desktop/TopBar";
import TopBarMobile from "./Mobile/TopBarMobile";
import { useMediaQuery } from "@mui/material";

function Header() {
  const isDesktop = useMediaQuery("(min-width:840px)");
  return <>{isDesktop ? <TopBar /> : <TopBarMobile />}</>;
}
export default memo(Header);
