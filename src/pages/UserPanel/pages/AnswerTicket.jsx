import { ShowAnswerTicket } from "../../../components/Modules";
import { motion } from "framer-motion";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";
export default function AnswerTicket() {

  return (
    <motion.div
      key={"AnswerTicket"}
      {...getUserPanelMotionConfig()}
    >
      <ShowAnswerTicket />
    </motion.div>
  );
}
