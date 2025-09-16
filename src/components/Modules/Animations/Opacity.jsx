import  { useMemo } from "react";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
function Opacity({
  children,
  duration = 0.15,
  ease = "easeInOut",
  className = "",
  setKey = true,
}) {
  const key = useMemo(() => {
    return uuid();
  }, []);
  return (
    <>
      {setKey ? (
        <motion.div
          key={key}// with key
          role="opacity-animtae"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease }}
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          role="opacity-animtae"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
export default Opacity;
