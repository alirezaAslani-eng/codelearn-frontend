
const getUserPanelMotionConfig = () => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15, ease: "easeInOut" },
  };
};
const getRotateMotionConfig = () => {
  return {
    initial: { opacity: 0, rotate: -45 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 45 },
    transition: { duration: 0.15, ease: "easeInOut" },
  };
};

export {
  getUserPanelMotionConfig,
  getRotateMotionConfig,
};
