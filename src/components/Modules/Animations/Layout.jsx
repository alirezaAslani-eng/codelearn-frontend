import { motion } from "framer-motion";

function Layout({
  children,
  layout = "position",
  duration = 0.3,
  className = "",
}) {
  // const { isInitialMount } = useCheckInitMount({ removeTime: 200 });

  return (
    <motion.div
      className={className || ""}
      layout={layout}
      transition={{ duration: duration }}
    >
      {children}
    </motion.div>
  );
}

export default Layout;
