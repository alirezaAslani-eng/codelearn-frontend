import { memo } from "react";
import { Link } from "react-router-dom";

 function Button({
  onClick,
  id = "",
  className = "",
  children,
  type = "button",
  disabled = false,
  to = "",
  target = "",
}) {
  const onClickCaller = (e) => {
    onClick && onClick(e);
  };

  return (
    <>
      {to ? (
        <Link target={target} id={id} to={to} onClick={onClickCaller}>
          <button
            disabled={disabled}
            type={type}
            className={`${className} flex items-center gap-x-2 justify-center`}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          id={id}
          disabled={disabled}
          type={type}
          className={`${className} flex items-center gap-x-2 justify-center`}
          onClick={onClickCaller}
        >
          {children}
        </button>
      )}
    </>
  );
}
export default memo(Button)
