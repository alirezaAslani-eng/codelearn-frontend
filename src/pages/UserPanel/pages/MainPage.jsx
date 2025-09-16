import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeaderSection, UserPanelFeatures } from "../../../components/Ui";
import {
  UserRecentlyTickets,
  UserRecentlyCourses,
  UserRecentlyOrders,
} from "../../../components/Modules";
import { AuthContext } from "../../../context";
import { getAllTickets, getAllUserOrders } from "../../../api";
import { queryKeys } from "../../../libs/reactQuery";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";
import { fromUser, userPanel } from "../../../routes/clientPath";
export default function MainPage() {
  const {
    userInfo,
    isError: userError,
    isPending: userLoading,
    userToken,
  } = useContext(AuthContext);

  const {
    data: tickets,
    isLoading: ticketLoading,
    isError: ticketError,
  } = useQuery({
    queryKey: queryKeys.tickets.all,
    queryFn: () =>
      getAllTickets({
        headers: { Authorization: `Bearer ${userToken}` },
      }),
  });

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: queryKeys.userOrders.all,
    queryFn: () =>
      getAllUserOrders({ headers: { Authorization: `Bearer ${userToken}` } }),
  });

  return (
    <motion.div key={"MainPage"} {...getUserPanelMotionConfig()}>
      <div>
        <UserPanelFeatures />
      </div>

      <div className="space-y-10 mt-10">
        <HeaderSection
          mainTitle="دروه های اخیر"
          linkText="تمام دوره های خریداری شده"
          link={fromUser(userPanel.my_courses)}
          disabledLink={!userInfo?.courses?.filter((item) => item)?.length}
        />
        <UserRecentlyCourses
          courses={userInfo?.courses?.filter((item) => item)}
          isError={userError}
          isLoading={userLoading}
        />
      </div>

      <div className="space-y-10 mt-10">
        <HeaderSection
          mainTitle="تیکت های اخیر"
          linkText="مشاهده همه"
          link={fromUser(userPanel.tickets)}
          disabledLink={!tickets?.filter((item) => item)?.length}
        />
        <UserRecentlyTickets
          tickets={tickets}
          isError={ticketError}
          isLoading={ticketLoading}
        />
      </div>
      <div className="space-y-10 mt-10">
        <HeaderSection
          mainTitle="سفارش های شما"
          linkText="مشاهده همه"
          link={fromUser(userPanel.odrers)}
          disabledLink={!orders?.filter((item) => item)?.length}
        />
        <UserRecentlyOrders
          orders={orders}
          isError={ordersError}
          isLoading={ordersLoading}
        />
      </div>
    </motion.div>
  );
}
