import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, MessageBox, Spiner, TextLoader } from "../../Ui";
import { HiOutlineArrowCircleLeft } from "../../Ui/icons/icons";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllTickets, getOneTicket } from "../../../api";
import { AuthContext } from "../../../context";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";

export default function ShowAnswerTicket() {
  const [allDetails, setAllDetails] = useState({});
  const { ticketId } = useParams(); // ticketId from parametr to get answer
  const nav = useNavigate();
  const {
    userToken,
    userInfo,
    isPending: userLoading,
    isError: userError,
  } = useContext(AuthContext);
  // get answer ticket ---- >
  const {
    data: ticketDetails,
    isLoading: detailsLoading,
    isError: detailsError,
    refetch: refetchTicketDetails,
  } = useQuery({
    queryKey: queryKeys.tickets.one(ticketId),
    queryFn: () =>
      getOneTicket({
        headers: { Authorization: `Bearer ${userToken}` },
        param: ticketId,
      }),
  });
  // get all ticket becasue we find the details of this ticket by using its id -- >
  const { data: tickets } = useQuery({
    queryKey: queryKeys.tickets.all,
    queryFn: () =>
      getAllTickets({
        headers: { Authorization: `Bearer ${userToken}` },
      }),
  });
  // use-effect to find the details of this ticket by using its id -- >
  useEffect(() => {
    const findedDetails = tickets?.find((item) => {
      return item?._id == ticketId;
    });
    setAllDetails(findedDetails || {});
  }, [tickets, ticketId]);

  return (
    <div className="font-dana-md">
      <div className="flex justify-end">
        <Button
          onClick={() => nav(-1)}
          className="accent-outline rounded-full text-sm mb-6 ml-0"
        >
          <HiOutlineArrowCircleLeft />
        </Button>
      </div>
      <section className="mb-6 space-y-3">
        <div className="flex items-center flex-wrap gap-x-2 pb-4 text-sm 2xs:text-base _840:text-xl dark:text-light text-dark border-b border-dark/40 dark:border-light/40">
          <span className="text-dark dark:text-light">عنوان تیکت :</span>
          <span className="text-dark/70 dark:text-light/70">
            {allDetails?.title}
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-x-2 text-xs 2xs:text-sm  _840:text-lg dark:text-light text-dark">
          <span className="text-dark dark:text-light"> دپارتمان :</span>
          <span className="text-dark/70 dark:text-light/70">
            {allDetails?.departmentSubID}
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-x-2 text-xs 2xs:text-sm  _840:text-lg dark:text-light text-dark">
          <span className="text-dark dark:text-light">تاریخ ارسال :</span>
          <span className="text-dark/70 dark:text-light/70">
            {allDetails?.createdAt?.slice(0, 10) || ""}
          </span>
        </div>
      </section>
      <div className="space-y-6">
        <div className="flex justify-start">
          <div className="max-w-[340px] sm:max-w-[500px]">
            <MessageBox
              right
              title={
                <LoadeingErrorHandler
                  isLoading={{
                    check: userLoading,
                    loading: (
                      <Spiner
                        className="!size-6"
                        textClassName="text-xs"
                        text="نام شما"
                      />
                    ),
                  }}
                  isError={{
                    check: userError,
                    error: (
                      <div className="bg-red-500/20 text-red-500 p-1.5 rounded-lg text-xs">
                        خطا در بارگزاری نام شما
                      </div>
                    ),
                  }}
                >
                  {userInfo?.name}
                </LoadeingErrorHandler>
              }
              text={
                <LoadeingErrorHandler
                  isLoading={{
                    check: detailsLoading,
                    loading: <TextLoader className="w-[200px] !bg-dark/40" />,
                  }}
                  isError={{
                    check: detailsError,
                    error: <TextLoader className="w-[200px] !bg-dark/40" />,
                  }}
                >
                  {ticketDetails?.ticket}
                </LoadeingErrorHandler>
              }
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[340px] sm:max-w-[500px]">
            <MessageBox
              left
              text={
                <LoadeingErrorHandler
                  isLoading={{
                    check: detailsLoading,
                    loading: <TextLoader className="w-[200px] !bg-dark/40" />,
                  }}
                  isError={{
                    check: detailsError,
                    error: <TextLoader className="w-[200px] !bg-dark/40" />,
                  }}
                >
                  {ticketDetails?.answer ??
                    "کاربر گرامی پاسخی برای شما هنوز ثبت نشده !"}
                </LoadeingErrorHandler>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
