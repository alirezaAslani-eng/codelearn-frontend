import Table from "../Table/Table";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";
import { Button, NoData, SerevrError, Spiner } from "../../Ui";
import { fromUser, userPanel } from "../../../routes/clientPath";
const defProps = {
  tickets: [],
};
export default function UserRecentlyTickets({
  tickets = defProps.tickets,
  isLoading = false,
  isError = false,
}) {
  const cols = [
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

  return (
    <div className="font-dana-md">
      <LoadeingErrorHandler
        isError={{
          error: <SerevrError />,
          check: isError,
        }}
        isLoading={{
          loading: <Spiner text="تیکت های اخیر شما" />,
          check: isLoading,
        }}
        dataCheck={{
          error: <NoData text="تیکتی ثبت نشده" />,
          check: tickets?.filter((item) => item)?.length,
        }}
      >
        <Table cols={cols} rows={tickets?.slice(0, 5)} maxRow={10} />
      </LoadeingErrorHandler>
    </div>
  );
}
