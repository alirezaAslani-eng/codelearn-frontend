import { useContext, useEffect, useState } from "react";
import { CartsContext } from "../../context";
import { BigCartBox, Button } from "../../components/Ui";
import { HiOutlineShoppingBag } from "../../components/Ui/icons/icons";
export default function BuyCoursePage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const { carts, removeCart } = useContext(CartsContext);

  const getTotalPrice = () => {
    const prices = carts?.map((item) => {
      return item?.price;
    });
    if (prices?.length) {
      const total = prices?.reduce((p, n) => {
        return p + n;
      });
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };
  const getTotalPriceWithDiscount = () => {
    //
    setPriceWithDiscount(3000000);
  };
  useEffect(() => {
    getTotalPrice();
    getTotalPriceWithDiscount();
  }, [carts]);

  return (
    <div className="container mt-6 font-dana-md text-dark dark:text-light">
      <div className="grid grid-cols-12 gap-10">
        <aside className="col-span-8">
          <BoxWithTopBar
            rightOption={
              <div className="flex items-center gap-x-1">
                <HiOutlineShoppingBag className="w-6 h-6" />
                {"سبد خرید"}
              </div>
            }
          >
            {carts?.map((cart) => {
              return (
                <BigCartBox
                  actions={{ onRemove: (id) => removeCart({ id }) }}
                  cartInfo={{ ...cart }}
                />
              );
            })}
          </BoxWithTopBar>
        </aside>
        <aside className="col-span-4">
          <BoxWithTopBar leftOption={"طلاعات پرداخت"}>
            <div className="space-y-4">
              <Seprator
                right={<p>مبلغ کل</p>}
                left={
                  <div className="flex items-center gap-x-1">
                    {totalPrice}
                    <span>تومان</span>
                  </div>
                }
              />
              <Seprator
                right={<p>تخفیف</p>}
                left={
                  <div className="flex items-center gap-x-1">
                    {"50%"}
                    <div className="flex items-center gap-x-1">
                      {"240,000"}
                      <span>تومان</span>
                    </div>
                  </div>
                }
              />
              <span className="block w-full bg-red-500 h-px"></span>
              <Seprator
                right={<p>مجموع:</p>}
                left={
                  <div className="flex items-center gap-x-1">
                    {totalPrice}
                    <span>تومان</span>
                  </div>
                }
              />
              <Seprator
                right={
                  <div className="flex items-center gap-x-1">
                    {/* <Checkbox /> */}
                    با قوانین موافقم
                  </div>
                }
              />
              <Button className="accent-outline w-full">تکمیل فرایند</Button>
            </div>
          </BoxWithTopBar>
        </aside>
      </div>
    </div>
  );
}

function BoxWithTopBar({
  children,
  rightOption,
  leftOption,
  parentClassName = "w-full bg-secondary-light dark:bg-secondary-dark rounded-lg",
  childrenBoxClassName = "px-6 py-5",
  topBarClassName = "h-[60px] w-full px-6 !bg-bg-accent/50 rounded-t-lg",
}) {
  return (
    <div className={`${parentClassName}`}>
      <section className={`${topBarClassName}`}>
        <div className="flex items-center justify-between h-full">
          {rightOption && rightOption}
          {leftOption && leftOption}
        </div>
      </section>
      <section className={`${childrenBoxClassName}`}>{children}</section>
    </div>
  );
}

function Seprator({ right, left }) {
  return (
    <div className="flex items-center justify-between">
      <aside className="flex items-center gap-x-2">{right}</aside>
      <aside className="flex items-center gap-x-2">{left}</aside>
    </div>
  );
}
