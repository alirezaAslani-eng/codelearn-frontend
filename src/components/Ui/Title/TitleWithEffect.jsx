import { memo } from "react";
import "./title.css";
function TitleWithEffect({
  className = "",
  level = "6",
  children,
  secondText,
}) {
  const TitleLevel = `h${level}`;
  return (
    <>
      <div className=" w-fit space-y-2 relative z-[1] ">
        <TitleLevel
          className={`${className} text-xl md:text-2xl text-dark dark:text-light  titleWithEffect `}
        >
          <span className="bg-bg-accent/50 dark:bg-bg-accent/20 effect"></span>
          {children}
        </TitleLevel>
        {secondText && (
          <span className="text-dark dark:text-light secondText">
            {secondText}
          </span>
        )}
      </div>
    </>
  );
}

export default TitleWithEffect
