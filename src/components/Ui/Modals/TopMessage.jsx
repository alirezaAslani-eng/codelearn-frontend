import  { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShadowAlert } from "../index";
const defProps = {
  onClose: () => {},
};
export default function ResultModal({
  result = "", // "success" / "error" / "warning"
  message = "خوش اومدید",
  onClose = defProps.onClose,
  isOpen = false, // false / true
  stillTime = 2000,
}) {
  const [isOpenMe, setIsOpenMe] = useState(false);
  const closer = () => {
    try {
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsOpenMe(isOpen); // show modal .
  }, [isOpen]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpenMe(false);
      setTimeout(() => {
        // close massega after 150ms
        closer();
      }, 150);
    }, stillTime);
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpenMe && (
          <>
            <motion.div
              key={"mobille-top-alert"}
              initial={{ opacity: 0, translateY: "-100%" }}
              animate={{ opacity: 1, translateY: "0" }}
              exit={{ opacity: 0, translateY: "-100%" }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="fixed z-[999] inset-0 w-full h-10 font-dana-md block _840:hidden"
            >
              <div
                className={`w-full  rounded-b-full backdrop-blur-lg border-r border-l border-b   ${
                  result == "success"
                    ? "bg-green-500/20 text-green-500 border-green-500/50 "
                    : result == "error"
                    ? "bg-red-500/20 text-red-500 border-red-500/50"
                    : result == "warning"
                    ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                    : "bg-green-500/20 !text-green-500 border-green-500/50 "
                }`}
              >
                <div className="flex justify-center w-full text-center py-1 px-5">
                  <p className="!text-sm">{message}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
            key={"desktop-top-alert"}
              initial={{ opacity: 0, translateX: "-10%" }}
              animate={{ opacity: 1, translateX: "0" }}
              exit={{ opacity: 0, translateX: "-10%" }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="fixed z-[999] top-[80px] left-2  font-dana-md hidden _840:block"
            >
              <div
                className={`rounded-lg backdrop-blur-lg border p-3 max-w-[200px] min-h-[70px] flex justify-center items-center  ${
                  result == "success"
                    ? "bg-green-500/20 text-green-500 border-green-500/50 "
                    : result == "error"
                    ? "bg-red-500/20 text-red-500 border-red-500/50"
                    : result == "warning"
                    ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                    : "bg-green-500/20 !text-green-500 border-green-500/50 "
                }`}
              >
                <p>{message}</p>
              </div>
            </motion.div>
          </>
        )}
        {isOpenMe && <ShadowAlert key={"hadow-side-alert"} result={result} />}
      </AnimatePresence>
    </>
  );
}
