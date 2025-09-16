import  { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const defProps = {
  inputProps: {},
};
export default function Input({
  inputProps = defProps.inputProps,
  label = false,
  className = "",
  isError = false,
  errText = "",
}) {
  const [inputId, setInputId] = useState("_");

  useEffect(() => {
    const inputId = uuid();
    setInputId("_" + inputId);
  }, []);

  return (
    <div className={`w-full ${errText && "space-y-2"}`}>
      <div
        className={`flex flex-col font-dana-md text-dark dark:text-light ${
          label && "gap-y-2"
        }`}
      >
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
        
          placeholder={label ? "" : inputProps?.placeholder}
          {...inputProps}
          id={inputId}
          type="text"
          className={`p-3 text-sm bg-secondary-light dark:bg-secondary-dark shadow rounded-lg outline-none w-full border ${className} 
        ${
          isError
            ? "dark:border-red-500/60 shadow-[_0px_0px_5px] shadow-red-500/50"
            : "dark:border-secondary-light/20 border-secondary-dark/20"
        }
          `}
        />
      </div>
      <div className="text-xs danger-text">{errText || ""}</div>
    </div>
  );
}
