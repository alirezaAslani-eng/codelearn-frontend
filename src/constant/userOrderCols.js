import { Button } from "../components/Ui";
import { fromMain, Main } from "../routes/clientPath";

const getOrdersColumn = () => {
  return [
    {
      title: "",
      customRender: ({ row }) => {
        return (
          <>
            {!!row?.course ? (
              <Button
                to={fromMain(`${Main.course_info}/${row?.course?.shortName}`)}
                className="accent-outline text-nowrap text-xs"
              >
                مشاهده دوره
              </Button>
            ) : (
              <p className="text-red-600 text-nowrap text-xs">
                این دوره پاک شده
              </p>
            )}
          </>
        );
      },
    },
    {
      propName: "createdAt",
      title: "تاریخ خرید",
      customRender: ({ row }) => {
        return <p className="text-nowrap">{row?.createdAt?.slice(0, 10)}</p>;
      },
    },
    {
      title: "مبلغ",
      customRender: ({ row }) => {
        return (
          <>
            {!!row?.course?.price ? (
              <p className="flex items-center gap-x-1">
                {row?.course?.price}
                <p className="text-xs">تومان</p>
              </p>
            ) : (
              "رایگان"
            )}
          </>
        );
      },
    },
    {
      title: "تخفیف",
      customRender: ({ row }) => {
        return <p>%{!!row?.course?.discount ? row?.course?.discount : "0"}</p>;
      },
    },

    {
      title: "عنوان دوره",
      customRender: ({ row }) => {
        return <p className="text-nowrap">{row?.course?.name}</p>;
      },
    },
  ];
};

export { getOrdersColumn };
