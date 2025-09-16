import { useContext, useEffect, useState } from "react";
import { HiOutlinePlay, HiOutlineChatAlt2 } from "../icons/icons";
import { AuthContext } from "../../../context";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllTickets } from "../../../api";
export default function UserPanelFeatures() {
  const {
    userInfo,
    userToken,
    isPending: userLoading,
  } = useContext(AuthContext);
  const [courseCounte, setCourseCounte] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  const { data: tickets, isLoading: ticketLoading } = useQuery({
    queryKey: queryKeys.tickets.all,
    queryFn: () =>
      getAllTickets({ headers: { Authorization: `Bearer ${userToken}` } }),
  });

  useEffect(() => {
    setCourseCounte(userInfo?.courses?.filter((item) => item)?.length || 0); // maybe a course has removed
    setTicketCount(tickets?.length || 0);
  }, [userInfo, tickets]);

  return (
    <div className="flex items-stretch gap-3 _840:gap-4 flex-wrap font-dana-md ">
      {!userLoading && (
        <div className=" p-5 rounded-lg bg-secondary-light dark:bg-secondary-dark shadow animate-initialShow will-change-transform">
          <FeaturesBox
            title={"دوره های در حال یادگیری"}
            text={
              <>
                {!!courseCounte ? (
                  <div className="flex items-center gap-x-2">
                    <HiOutlinePlay className="w-6 h-6 text-text-accent dark:text-bg-accent" />
                    <p>{courseCounte} دوره</p>
                  </div>
                ) : (
                  <p>دوره ای خریداری نشده</p>
                )}
              </>
            }
          />
        </div>
      )}
      {!ticketLoading && (
        <div className=" p-5 rounded-lg bg-secondary-light dark:bg-secondary-dark shadow animate-initialShow will-change-transform">
          <FeaturesBox
            title={"تیکت های شما"}
            text={
              <>
                {!!ticketCount ? (
                  <div className="flex items-center gap-x-2">
                    <HiOutlineChatAlt2 className="w-6 h-6 text-text-accent dark:text-bg-accent" />
                    <p>{ticketCount} تیکت</p>
                  </div>
                ) : (
                  <p>تیکتی ندارید</p>
                )}
              </>
            }
          />
        </div>
      )}
    </div>
  );
}

function FeaturesBox({ title = <></>, text = <></> }) {
  return (
    <div className="flex items-center justify-center flex-col gap-y-3 text-dark dark:text-white text-center">
      <p className=" text-sm _840:text-lg">{title}</p>
      <div className="text-xs _840:text-sm">{text}</div>
    </div>
  );
}
