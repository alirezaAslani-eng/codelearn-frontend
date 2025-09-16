const defProps = {
  inputProps: {},
};
export default function TextAreaInput({
  inputProps = defProps.inputProps,
  label = true,
  className = "",
  isError = false,
  errText = "",
}) {
  return (
    <div className={`${errText&&"space-y-2"}`}>
      <textarea
        {...inputProps}
        className={`bg-secondary-light dark:bg-secondary-dark w-full max-h-[95px] min-h-[95px] p-3 rounded-lg outline-none border
              ${
                isError
                  ? "dark:border-red-500/60 shadow-[_0px_0px_5px] shadow-red-500/50"
                  : "dark:border-secondary-light/20 border-secondary-dark/20"
              }
              
              `}
      ></textarea>
      <div className="h-4 text-xs flex items-center danger-text">
        {errText || ""}
      </div>
    </div>
  );
}
