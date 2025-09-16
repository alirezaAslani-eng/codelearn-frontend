import { useEffect, useState } from "react";
import DelText from "../DelText/DelText";
import { HiOutlineFolderRemove } from "../icons/icons";
import { getOff } from "../../../utils";
import { imageAddrees } from "../../../constant/SerevrRoute";
import Img from "../Img/Img";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../Buttons";
import {
  fromMain,
  fromUser,
  Main,
  userPanel,
} from "../../../routes/clientPath";
const defProps = {
  cartInfo: {},
  actions: {},
};
export default function CartBox({
  cartInfo = defProps.cartInfo,
  actions = defProps.actions,
}) {
  const {
    _id = "",
    cover = "",
    name = "",
    price = "",
    discount = "",
    shortName = "",
  } = cartInfo;
  const [applyedOff, setApplyedOff] = useState(0);

  useEffect(() => {
    const off = getOff({ off: discount, price });
    setApplyedOff(price - off);
  }, [discount, price]);

  const onLinkCaller = () => {
    try {
      actions?.onLink();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-between gap-x-3 h-[72px]">
      <aside className="flex items-center gap-x-3 h-full">
        {/* Image section  */}

        <Link
          to={fromMain(`${Main.course_info}/${shortName}`)}
          onClick={onLinkCaller}
          className="block shrink-0 h-[60px]"
        >
          <Img
            loader
            loaderClassName="rounded-lg"
            className="aspect-video h-full rounded-lg"
            src={`${imageAddrees}${cover}`}
          />
        </Link>

        {/* Title and description section */}
        <section className="h-full">
          <div className="flex flex-col justify-between h-full">
            <NavLink
              to={fromMain(`${Main.course_info}/${shortName}`)}
              onClick={onLinkCaller}
              className="block"
            >
              <p className="line-clamp-2 text-sm text-dark/80 dark:text-light/80">
                {name}
              </p>
            </NavLink>
            <div className="flex items-center gap-x-4 text-dark/50 dark:text-light/50">
              {/* Price and off section */}
              <div className="flex items-center gap-x-2 text-xs">
                {price != 0 && discount != 0 ? (
                  <DelText>{price}</DelText>
                ) : null}
                <div className="flex items-center gap-x-1">
                  {price != 0 ? (
                    <>
                      <p>{applyedOff}</p>
                      <p className="text-xs">تومان</p>
                    </>
                  ) : (
                    <p>رایگان</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>
      <aside>
        {/* delete button */}
        <Button onClick={() => actions?.onRemove(_id)} className="danger-btn">
          <HiOutlineFolderRemove className="min-w-4 min-h-4" />
        </Button>
      </aside>
    </div>
  );
}
