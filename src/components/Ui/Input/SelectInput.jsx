// در کامپوننت CustomSelect
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Opacity, Portal } from "../../Modules";
import {HiChevronLeft} from "../icons/icons"
import { motion, AnimatePresence } from "framer-motion";
const defProps = {
  options: [{ text: "", value: "" }], // your options as a object
  selectProps: {
    // selectProps - > <select {...selectProps}>
    onChange: () => {},
    onBlur: () => {},
    // ...... value , name , ref .. and more
  },
  defaultOption: { text: "", value: "" }, // when your options is in loading we show this option
  onChange: (value, {}) => {}, // another onChange if you use (react hook form) and you need to handle onChange, use it .
  label: "",
  isError: false,
};

const SelectInput = ({
  options = defProps.options,
  selectProps = defProps.selectProps,
  onChange = defProps.onChange,
  defaultOption = defProps.defaultOption,
  label = defProps?.label,
  isError = defProps.isError,
  // customizing ui by class -- >
  optionClassName = "",
  defaultOptionClassName = true,
  className = "",
  defaultClassName = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVal, setCurrentVal] = useState({ value: "", text: "" });
  const id = "_" + uuid();

  const toggleMenu = () => {
    if (!isOpen) {
      const event = new CustomEvent("custom-select-toggle", { detail: id }); // GLOBAL EVENT
      document.dispatchEvent(event); // set global event
    }
    setIsOpen((prev) => !prev); // open or close me
  };

  const closeOptionBox = () => {
    setIsOpen(false);
  };

  const changeHandler = ({ text = "", value = "", allProps = {} } = {}) => {
    setCurrentVal({ text, value });
    try {
      selectProps?.onChange(value); // this is for hook form if you use
      onChange(value, allProps); // when yuo use react hook form you can use onChange for your self
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleOtherOpen = (e) => {
      if (e.detail !== id) {
        // close me if there are another open menus
        setIsOpen(false);
      }
    };
    document.addEventListener("custom-select-toggle", handleOtherOpen);
    return () => {
      document.removeEventListener("custom-select-toggle", handleOtherOpen);
    };
  }, [id]);

  useEffect(() => {
    const selectedOp = options?.find((item) => {
      return item?.selected;
    });

    if (selectedOp) {
      // initial set value (only selected=true)
      setCurrentVal({ text: selectedOp?.text, value: selectedOp?.value }); // set internal state to show on ui
      try {
        selectProps?.onChange(selectedOp?.value || "");
        onChange(selectedOp?.value || "", { ...selectedOp });
      } catch (err) {
        console.log(err);
      }
    } else if (options?.length) {
      // check there are any optiions at all if yes :
      // set first of your option
      setCurrentVal({ text: options[0]?.text, value: options[0]?.value });
      try {
        selectProps?.onChange(options[0]?.value || "");
        onChange(options[0]?.value || "", { ...options[0] });
      } catch (err) {
        console.log(err);
      }
    } else {
      // this scope run when options come from server and we dont have theme now
      // if there aren't any optiions, set your default option
      setCurrentVal({ text: defaultOption?.text, value: defaultOption?.value });
      try {
        selectProps?.onChange(defaultOption?.value || "");
        onChange(defaultOption?.value || "", { ...defaultOption });
      } catch (err) {
        console.log(err);
      }
    }
  }, [options]);

  return (
    <>
      <div className="flex flex-col w-full gap-y-2 font-dana-md text-dark dark:text-light">
        {/* Label section */}
        {label && (
          <label
            onClick={toggleMenu}
            className={`relative z-[2] text-xs _840:text-sm ${
              isOpen ? "z-[3]" : ""
            }`}
          >
            {label}
          </label>
        )}
        {/* Select tag section */}
        <div
          onClick={toggleMenu}
          className={`relative z-[2] ${isOpen ? "z-[3]" : ""} ${
            isError
              ? "!border-red-500/40 !shadow !shadow-red-500/40 !text-red-500"
              : ""
          } ${
            defaultClassName
              ? "flex w-full justify-between items-center p-4 pl-2 gap-x-2 bg-secondary-light/80 dark:bg-secondary-dark/80 shadow rounded-md"
              : className
          } `}
        >
          {/* Select conten */}
          <div
            className={`cursor-pointer bg-transparent overflow-hidden border-transparent `}
          >
            <p className="line-clamp-1 text-xs _840:text-sm select-none">
              {currentVal?.text}
            </p>
          </div>
          {/* Button Section */}
          <AnimatePresence>
            <Opacity duration={0.3}>
              <div>
                {!isOpen ? (
                  <HiChevronLeft className="-rotate-90" />
                ) : (
                  <HiChevronLeft className="rotate-90" />
                )}
              </div>
            </Opacity>
          </AnimatePresence>
          {/* OPtions section */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full absolute left-0 top-[calc(100%+10px)] z-[4] shadow rounded-md border border-secondary-dark/5 dark:border-secondary-light/5 bg-secondary-light dark:bg-secondary-dark"
              >
                <div
                  className={`${
                    defaultOptionClassName
                      ? "text-dark/70 dark:text-light/70 p-3 space-y-3"
                      : optionClassName
                  }  `}
                >
                  {options?.map((op, index) => {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => {
                          try {
                            changeHandler({
                              text: op?.text || "",
                              value: op?.value,
                              allProps: { ...op },
                            });
                          } catch (err) {
                            console.log(err);
                          }
                          closeOptionBox();
                        }}
                      >
                        <p className="line-clamp-2 text-xs _840:text-sm select-none">
                          {op?.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Hidden select  */}
      <select
        {...selectProps}
        value={selectProps?.value}
        className="hidden"
      ></select>

      <Portal container={"body"}>
        {isOpen && (
          <div
            onClick={closeOptionBox}
            className="w-full h-screen fixed top-0 left-0 z-[1]"
          ></div>
        )}
      </Portal>
    </>
  );
};

export default SelectInput;
