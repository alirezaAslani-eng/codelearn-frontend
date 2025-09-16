import { memo, useContext } from "react";
import { HiChevronLeft } from "../icons/icons";
import { NavLink } from "react-router-dom";
import { BreadCrumpContext } from "../../../context";
function BreadCrump() {
  const { breadCrumpAddress } = useContext(BreadCrumpContext);

  return (
    <>
      {breadCrumpAddress?.length ? (
        <div className="w-full py-2 sm:py-3 px-2 sm:px-5 rounded-full bg-secondary-light dark:bg-secondary-dark flex items-center gap-x-3 overflow-x-auto hidden-scroll shadow">
          <div className="flex items-center gap-x-2 font-dana-md ">
            {breadCrumpAddress?.map((item, index) => {
              return <BreadCrumpButton {...item} key={index} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
export default memo(BreadCrump);

const BreadCrumpButton = ({ text, link }) => {
  return (
    <button className="py-2 px-3 rounded-full shadow dark:bg-primary-dark">
      <NavLink
        end
        className={
          "text-nowrap text-sm flex justify-center items-center gap-x-2"
        }
        to={link}
      >
        {text}
        <HiChevronLeft />
      </NavLink>
    </button>
  );
};
