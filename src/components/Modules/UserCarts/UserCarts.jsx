import  { memo, useContext } from "react";
import { CartsContext } from "../../../context";
import { CartBox, NoData } from "../../Ui";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";
import { AnimatePresence, motion } from "framer-motion";
import Opacity from "../Animations/Opacity";

function UserCarts() {
  const { carts, removeCart, totalPrice } = useContext(CartsContext);
  return (
    <AnimatePresence>
      <div className="font-dana-md grid md:grid-cols-2 gap-3">
        <LoadeingErrorHandler
          dataCheck={{
            check: carts?.length,
            error: (
              <div className="abs-center">
                <NoData text="سبد شما خالی هست" />
              </div>
            ),
          }}
        >
          {carts?.map((cart, index) => {
            return (
              <Opacity
                key={cart?._id || index}
                className="bg-bg-accent/20 p-2 rounded-xl"
              >
                <CartBox
                  actions={{ onRemove: () => removeCart({ id: cart?._id }) }}
                  cartInfo={{ ...cart }}
                />
              </Opacity>
            );
          })}

          <motion.section
            layout="position"
            className="flex items-center justify-between bg-green-500/30 text-green-500 p-5 rounded-xl"
          >
            <div>در مجموع :</div>
            <div className="flex items-center gap-x-px">
              <span>{totalPrice}</span>
              <span className="text-xs block self-end">تومان</span>
            </div>
          </motion.section>
        </LoadeingErrorHandler>
      </div>
    </AnimatePresence>
  );
}

export default memo(UserCarts);
