import { AnimatePresence, motion } from "framer-motion";
import { HiX, HiOutlineChatAlt2 } from "../icons/icons";
import { getRotateMotionConfig } from "../../../constant/animationConfig";
export default function ChatBoxIcon({
  isOpen = false,
  className = "size-6 text-dark/90",
}) {
  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div key={"closed-chat-box-icon"} {...getRotateMotionConfig()}>
            <HiX className={className} />
          </motion.div>
        ) : (
          <motion.div key={"opened-chat-box-icon"} {...getRotateMotionConfig()}>
            <HiOutlineChatAlt2 className={className} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
