import {  UserOrders } from "../../../components/Modules";
import { motion } from "framer-motion";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";

export default function AllOrders() {
  return (
    <motion.div
      {...getUserPanelMotionConfig()}
      key={"AllOrders"}
      className="h-full"
    >
      <UserOrders />
    </motion.div>
  );
}
