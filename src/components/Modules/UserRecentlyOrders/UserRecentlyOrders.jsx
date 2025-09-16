import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllUserOrders } from "../../../api";
import { AuthContext } from "../../../context";
import { NoData, SerevrError, Spiner } from "../../Ui";
import Table from "../Table/Table";
import { LoadeingErrorHandler } from "../index";
import { getOrdersColumn } from "../../../constant/userOrderCols";

export default function UserRecentlyOrders() {
  const { userToken } = useContext(AuthContext);
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: [...queryKeys.userOrders.all, userToken],
    queryFn: () =>
      getAllUserOrders({ headers: { Authorization: `Bearer ${userToken}` } }),
  });

  return (
    <div className="w-full font-dana-md">
      <LoadeingErrorHandler
        isError={{
          error: <SerevrError />,
          check: ordersError,
        }}
        isLoading={{
          loading: <Spiner text="در حال بارگیری سفارش  های شما !" />,
          check: ordersLoading,
        }}
        dataCheck={{
          error: <NoData text="سفارشی ثبت نشده" />,
          check: orders?.filter((item) => item)?.length,
        }}
      >
        <Table rows={orders} cols={getOrdersColumn()} />
      </LoadeingErrorHandler>
    </div>
  );
}
