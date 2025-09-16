import { UserTickets } from "../../../components/Modules";
import { motion } from "framer-motion";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";
export default function Tickets() {
  return (
    <motion.div key={"Tickets"} {...getUserPanelMotionConfig()} className="h-full">
      <UserTickets />
    </motion.div>
  );
}
