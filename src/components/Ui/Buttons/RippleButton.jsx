import { useEffect, useRef, useState } from "react";
const defProps = {
  buttonProps: {},
};
export default function RegisterButton({
  children,
  buttonProps = defProps.buttonProps,
  className = "",
  rippleDuration = 1, // only 0.9>.... like 1,2,3..more
}) {
  // State -- >
  const [firstClick, setFirstClick] = useState(false); // before first click the ripple dosen't work !
  const [ripples, setRipples] = useState([]); // a list of active ripples !
  // Ref -- >
  const btnRef = useRef(null);
  // Events -- >
  const DownHandler = ({ clientX, clientY }) => {
    // button ref to get its details -- >
    const button = btnRef.current;
    const { left = 0, top = 0 } = button?.getBoundingClientRect();
    // get ripple position -- >
    let x = Math.floor(clientX - left);
    let y = Math.floor(clientY - top);
    // show ripple --- >
    setFirstClick(true);
    setRipples((prev) => {
      return [...prev, { x, y }];
    });
  };
  let time = Number(rippleDuration + "000");
  useEffect(() => {
    if (!ripples.length) return;
    const rippleRemover = setTimeout(() => {
      setRipples([]);
    }, time);
    return () => {
      clearTimeout(rippleRemover);
    };
  }, [ripples.length]);

  return (
    <>
      <button
        {...buttonProps}
        ref={btnRef}
        onMouseDown={DownHandler}
        className={` relative overflow-hidden ${className}`}
      >
        <div className="relative z-[2]">{children}</div>

        {firstClick && (
          <>
            {ripples.map((item,index) => {
              if (!item) return null;
              return (
                <div
                  key={index}
                  style={{
                    left: item.x,
                    top: item.y,
                    animation: "rippleEffect ease forwards",
                    animationDuration: rippleDuration + "s",
                  }}
                  className={`text-left rounded-full absolute z-[1] size-[1px] bg-white/50  -translate-x-1/2 -translate-y-1/2`}
                ></div>
              );
            })}
          </>
        )}
      </button>
      <div className="hidden animate-riple"></div>
    </>
  );
}
