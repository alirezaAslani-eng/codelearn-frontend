import  { useContext } from "react";
import { LoadeingErrorHandler, SendTicketForm } from "../../../components/Modules";
import { AuthContext } from "../../../context";
import { motion } from "framer-motion";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";
export default function SendTicket() {
  const { isPending: userLoading, isError: userError } = useContext(AuthContext)
  return (
    <motion.div {...getUserPanelMotionConfig()} key={"SendTicket"} className="h-full">

      <SendTicketForm />

    </motion.div>
  );
}
