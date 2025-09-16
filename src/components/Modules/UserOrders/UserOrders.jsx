import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllUserOrders } from "../../../api";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../../context";
import { LoadeingErrorHandler, ShowList } from "../index";
import { Button, NoData, SerevrError, Spiner, TitleWithEffect } from "../../Ui";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowCircleLeft } from "../../Ui/icons/icons";
import { getOrdersColumn } from "../../../constant/userOrderCols";
export default function UserOrders() {
  // UserInfo -- >
  const { userToken } = useContext(AuthContext);
  const nav = useNavigate();
  // get orders ---- >
  const {
    data: orders,
    isLoading: orderLoading,
    isError: orderError,
  } = useQuery({
    queryKey: [...queryKeys.userOrders.all, userToken],
    queryFn: () =>
      getAllUserOrders({ headers: { Authorization: `Bearer ${userToken}` } }),
  });
  const filterList = useMemo(() => {
    return [
      { selected: true, text: "جدید ترین", defaultState: true, value: "" },
      { text: "سفارش های رایگان", path: "price", value: "0" },
    ];
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-x-3 items-center mb-10">
        <TitleWithEffect>تمام نیکت های شما</TitleWithEffect>
        <Button
          onClick={() => nav(-1)}
          className="accent-outline !rounded-full"
        >
          <HiOutlineArrowCircleLeft />
        </Button>
      </div>
      <LoadeingErrorHandler
        isLoading={{
          check: orderLoading,
          loading: (
            <div className="abs-center">
              <Spiner text="در حال بارگیری" />
            </div>
          ),
        }}
        isError={{
          check: orderError,
          error: (
            <div className="abs-center">
              <SerevrError />
            </div>
          ),
        }}
        dataCheck={{
          check: orders?.length,
          error: (
            <div className="abs-center">
              <NoData text="سفارشی ندارید" />
            </div>
          ),
        }}
      >
        <ShowList
          cols={getOrdersColumn()}
          rows={orders}
          filterList={filterList}
        />
      </LoadeingErrorHandler>
    </div>
  );
}
