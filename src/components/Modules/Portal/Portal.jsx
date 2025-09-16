import  { useRef, useEffect } from "react";
import { Portal as MuiPortal } from "@mui/material";
// How to use ?????
// you just send these props >>
// (container) it will shoud be a string like -> tag "body" id "#elemnt" class ".element"
// and children is your element or content that you want to put them in your container
export default function Portal({ container, children }) {

  const containerElement = useRef(null);

  useEffect(() => {
    containerElement.current = document.querySelector(container);
  }, []);

  if (containerElement.current) {
    return <MuiPortal container={containerElement.current}>{children}</MuiPortal>;
  }
}
