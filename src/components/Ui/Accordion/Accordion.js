import { useState } from "react";
import { HiOutlineArrowCircleLeft } from "../icons/icons";
import Opacity from "../../Modules/Animations/Opacity";
import { AnimatePresence } from "framer-motion";
export default function MuiAccordion({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex justify-between items-center font-dana-md text-dark dark:text-light bg-primary-light dark:bg-primary-dark shadow p-3 rounded-lg w-full "
      >
        {title}
        <HiOutlineArrowCircleLeft
          className={`size-6 transition-all will-change-transform ${
            isOpen ? "-rotate-90" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && <Opacity className="p-4">{children}</Opacity>}
      </AnimatePresence>
    </div>
  );
}
