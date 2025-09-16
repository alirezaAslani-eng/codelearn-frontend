import { useEffect, useState } from "react";
// utils
import { Opacity, Portal } from "../../Modules";
// components
import { BackCover } from "../index";
import { AnimatePresence } from "framer-motion";

export default function MenuBox({
  children,
  isOpen = false,
  zIndex = 20,
  zIndex_backcover = 5,
  onClose,
  backCover = true,
  className = "",
}) {
  const [isMonte, setIsMounte] = useState(false);
  const closeHandler = () => {
    try {
      onClose();
    } catch (err) {}
  };

  useEffect(() => {
    if (isMonte) {
      const body = document.querySelector("body");
      body.addEventListener("click", closeHandler);
      return () => {
        body.removeEventListener("click", closeHandler);
      };
    }
  }, [ isMonte]);
  useEffect(() => {
    setIsMounte(isOpen);
  }, [isOpen]);
  return (
    <>
      <AnimatePresence>
        {isMonte && (
          <Opacity
            onClick={(e) => e.stopPropagation()}
            style={{
              zIndex: zIndex,
            }}
            className={`rounded-lg shadow bg-secondary-light dark:bg-secondary-dark  ${className}`}
          >
            {children}
          </Opacity>
        )}
      </AnimatePresence>

      <Portal container={"body"}>
        {isMonte && (
          <BackCover
            className={`${backCover ? "bg-black/50 backdrop-blur-md" : ""}`}
            zIndex={zIndex_backcover}
            onClick={closeHandler}
          />
        )}
      </Portal>
    </>
  );
}
