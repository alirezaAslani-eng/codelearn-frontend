import { motion } from "framer-motion";
export default function ShadowAlert({ result = "success" }) {
  return (
    <>
      {/* Right shadow */}
      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className={`h-screen w-10 translate-x-full fixed  z-[999] right-0 top-0 
                ${
                  result == "success"
                    ? "shadow-[_-3px_0px_30px_rgba(34,197,94,0.5)]"
                    : result == "error"
                    ? "shadow-[_-3px_0px_30px_rgba(239,68,68,0.5)]"
                    : result == "warning"
                    ? "shadow-[_-3px_0px_30px_rgba(234,179,8,0.5)]"
                    : "shadow-[_-3px_0px_30px_rgba(34,197,94,0.5)]"
                }  
                `}
      ></motion.div>
      {/* Left shadow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className={`h-screen w-10 -translate-x-full fixed  z-[999] left-0 top-0 ${
          result == "success"
            ? "shadow-[_-3px_0px_30px_rgba(34,197,94,0.5)]"
            : result == "error"
            ? "shadow-[_-3px_0px_30px_rgba(239,68,68,0.5)]"
            : result == "warning"
            ? "shadow-[_-3px_0px_30px_rgba(234,179,8,0.5)]"
            : "shadow-[_-3px_0px_30px_rgba(34,197,94,0.5)]"
        }  `}
      ></motion.div>
    </>
  );
}
