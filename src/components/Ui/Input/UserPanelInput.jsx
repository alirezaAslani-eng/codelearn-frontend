import  { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
const defProps = {
  inputProps: {},
  label: true,
  icon: <></>,
  isError: false,
};
export default function ({
  inputProps = defProps.inputProps,
  label = defProps.label,
  icon = defProps.icon,
  isError = defProps.isError,
}) {
  const [inputId, setInputId] = useState("_");

  useEffect(() => {
    const inputId = uuid();
    setInputId("_" + inputId);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-2 font-dana-md text-dark dark:text-light ">
        {label && (
          <label className="text-xs _840:text-sm" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div
          className={`flex w-full items-center pl-2 gap-x-2 flex-1 bg-secondary-light/80 dark:bg-secondary-dark/80 shadow rounded-md border border-transparent transition-all ${
            isError
              ? "!border-red-500/40 shadow shadow-red-500/40 !text-red-500"
              : ""
          }`}
        >
          <input
            {...inputProps}
            id={inputId}
            className="pl-1 pr-4 py-4 w-full text-xs _840:text-sm bg-transparent  outline-none"
          />
          {icon}
        </div>
      </div>
    </>
  );
}
