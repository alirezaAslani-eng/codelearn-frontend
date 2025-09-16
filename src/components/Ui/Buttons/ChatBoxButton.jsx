import  { memo, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

function ChatBoxButton(props) {
  const [isMeShow, setIsMeShow] = useState(false);
  const isDesktop = useMediaQuery("(min-width:840px)");
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsMeShow(true);
    }, 1000);
    return () => clearTimeout(timeOut);
  });
  return (
    <>
      {isDesktop && (
        <button
          {...(props?.button || {})}
          className={`p-4 relative rounded-full flex justify-center items-center bg-bg-accent text-dark/90  transition-all  ${
            isMeShow
              ? "translate-x-[0px] _840:translate-x-[30px] opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="bg-bg-accent/50 size-[calc(100%+10px)] rounded-full animate-pulse absolute abs-center z-[-1]"></div>
          {props?.children}
        </button>
      )}
    </>
  );
}
export default memo(ChatBoxButton);
