import { useEffect, useState } from "react";
import DelText from "../DelText/DelText";
import { HiOutlineFolderRemove } from "../icons/icons";
import { getOff } from "../../../utils";
import { imageAddrees } from "../../../constant/SerevrRoute";
const defProps = {
  cartInfo: {},
  actions: () => {},
};
export default function CartBox({
  cartInfo = defProps.cartInfo,
  actions = {},
}) {
  const { cover, name, price, disCount, _id, creator } = cartInfo;
  const [applyedOff, setApplyedOff] = useState(0);
  useEffect(() => {
    const applyedOffOnRealPrice = getOff({ disCount, price });
    setApplyedOff(applyedOffOnRealPrice || price);
  }, [disCount, price]);
  return (
    <div className="flex items-center justify-between gap-x-4 h-[88px]">
      <aside className="flex items-center h-full gap-x-3">
        {/* Image section  */}
        <section className="h-full">
          <img
            className="aspect-video h-full rounded-lg "
            src={`${imageAddrees}${cover}`}
          />
        </section>
        {/* Title and description section */}
        <section className="h-full">
          <div className="flex flex-col justify-center gap-y-2">
            <div>
              <p className="line-clamp-2">{name}</p>
            </div>
            <div>
              <p className="text-xs">{creator?.name}</p>
            </div>
          </div>
        </section>
      </aside>
      <aside>
        <section>
          <div className="flex items-center gap-x-6">
            {/* Price and off section */}
            <div className="flex flex-col justify-center">
              {price != 0 && disCount != 0 ? <DelText>{price}</DelText> : null}
              <div className="flex items-center gap-x-1">
                {price != 0 ? (
                  <>
                    <span>{applyedOff}</span>
                    <span>تومان</span>
                  </>
                ) : (
                  <span>رایگان</span>
                )}
              </div>
            </div>
            {/* delete button */}
            <div>
              <HiOutlineFolderRemove onClick={() => actions?.onRemove(_id)} />
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
