import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllTickets } from "../../../api";
import { AuthContext } from "../../../context";
import { LoadeingErrorHandler, ShowList } from "../index";
import { Button, NoData, SerevrError, Spiner, TitleWithEffect } from "../../Ui";
import { HiOutlineArrowCircleLeft } from "../../Ui/icons/icons";
import { fromUser, userPanel } from "../../../routes/clientPath";
export default function UserTickets() {
  // User Context -- >
  const { userToken, isPending: userLoading } = useContext(AuthContext);
  const nav = useNavigate();
  // Get tickets list --- >
  const {
    data: tickets,
    isError: ticketError,
    isLoading: ticketLaoding,
  } = useQuery({
    enabled: !userLoading,
    queryKey: [...queryKeys.tickets.all, userToken],
    queryFn: () =>
      getAllTickets({ headers: { Authorization: `Bearer ${userToken}` } }),
  });

  // table columns -- ->
  const cols = useMemo(() => {
    return [
      {
        title: "",
        customRender: ({ row }) => {
          return (
            <>
              <Button
                className="accent-outline text-xs"
                to={fromUser(`${userPanel.ticket_status}/${row?._id}`)}
              >
                مشاهده
              </Button>
            </>
          );
        },
      },
      {
        title: "تاریخ ارسال",
        customRender: ({ row }) => {
          return (
            <>
              <p className="line-clamp-1 w-[80px]">
                {row?.createdAt?.slice(0, 10)}
              </p>
            </>
          );
        },
      },
      {
        title: "عنوان تیکت",
        customRender: ({ row }) => {
          return (
            <>
              <p className="line-clamp-1">{row?.title}</p>
            </>
          );
        },
      },
      {
        title: "متن تیکت",
        customRender: ({ row }) => {
          return (
            <>
              <div className="w-[200px] line-clamp-1">
                <p>{row?.body}</p>
              </div>
            </>
          );
        },
      },
      {
        title: "وضعیت",
        customRender: ({ row }) => {
          return (
            <>
              {!!row?.answer ? (
                <p className="text-green-600 text-nowrap">پاسخ داده شد</p>
              ) : (
                <p className="dark:text-yellow-400 text-yellow-500 text-nowrap">
                  در انتظار پاسخ
                </p>
              )}
            </>
          );
        },
      },
      {
        title: "تعداد پاسخ ها",

        customRender: ({ row }) => {
          return (
            <div className="flex items-center gap-x-2 text-nowrap">
              {row?.answer}
              <p>پاسخ</p>
            </div>
          );
        },
      },
      {
        title: "دسته بندی",
        customRender: ({ row }) => {
          return (
            <div className="flex items-center gap-x-2 text-nowrap">
              <p>{row?.departmentID}</p>
            </div>
          );
        },
      },
    ];
  }, []);
  // filter dropdown options --- >
  const filterList = useMemo(() => {
    return [
      { text: "جدید ترین", selected: true, defaultState: true },
      { text: "بدون پاسخ ها", value: "0", path: "answer" },
      { text: "پاسخ داده شده ها", value: "1", path: "answer" },
    ];
  }, []);

  return (
    <div>
      {/* Title */}
      <div className="flex justify-between gap-x-3 items-center mb-10">
        <TitleWithEffect>تمام تیکت های شما</TitleWithEffect>
        <Button
          onClick={() => nav(-1)}
          className="accent-outline !rounded-full"
        >
          <HiOutlineArrowCircleLeft />
        </Button>
      </div>

      <LoadeingErrorHandler
        dataCheck={{
          check: tickets?.length,
          error: (
            <div className="abs-center">
              <NoData text="تیکتی ندارید" />
            </div>
          ),
        }}
        isError={{
          check: ticketError,
          error: (
            <div className="abs-center">
              <SerevrError />
            </div>
          ),
        }}
        isLoading={{
          check: ticketLaoding,
          loading: (
            <div className="abs-center">
              <Spiner text="در حال بارگزاری" />
            </div>
          ),
        }}
      >
        <ShowList cols={cols} rows={tickets} filterList={filterList} />
      </LoadeingErrorHandler>
    </div>
  );
}
