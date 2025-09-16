import { useContext } from "react";
import { CartsContext } from "../../../context";
import { HiOutlineShoppingBag } from "../../Ui/icons/icons";
import { Button, CartBox } from "../../Ui";
import { OpenFolderIcon } from "../../../assist/svg";
const defProps = {
  onBuy: () => {},
};
export default function Carts({ onBuy = defProps.onBuy }) {
  const { carts, removeCart, totalPrice } = useContext(CartsContext);

  const onBuyCaller = () => {
    try {
      onBuy();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pb-5 w-full h-full">
      {/* Header -- > */}
      <div className="h-[60px] w-full bg-bg-accent/50 rounded-t-lg">
        <div className="flex items-center justify-between h-full px-5">
          <div className="flex items-center gap-x-1">
            <p>سبد خرید</p>
            <HiOutlineShoppingBag className="w-6 h-6" />
          </div>
          <div>
            {carts?.length} {"دوره"}
          </div>
        </div>
      </div>
      {/* Carts list -- > */}
      {carts?.length ? (
        <div className=" px-5 mt-4 min-h-[80px] max-h-[150px] overflow-y-auto accent-scroll">
          {carts?.map((cart, index) => {
            return (
              <CartBox
                key={cart?._id || index}
                actions={{
                  onRemove: (id) => removeCart({ id }),
                  onLink: onBuyCaller,
                }}
                cartInfo={{ ...cart }}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-5">
          <div className="flex items-center flex-col gap-y-2">
            <OpenFolderIcon className="size-12 text-bg-accent" />
            <p>دوره ای اضافه نشده</p>
          </div>
        </div>
      )}
      {carts?.length ? (
        <div className="flex items-center justify-between px-5 mt-4">
          <p className="text-sm text-dark dark:text-light">مبلغ قابل پرداخت:</p>
          <span className="flex items-center gap-x-1">
            {totalPrice?.toLocaleString()}
            <span className="text-xs">تومان</span>
          </span>
        </div>
      ) : null}
      {carts?.length ? (
        <div className="px-5 mt-4">
          <Button
            onClick={onBuyCaller}
            to={"/buy"}
            className="accent-outline w-full"
          >
            خرید
          </Button>
        </div>
      ) : null}
    </div>
  );
}
