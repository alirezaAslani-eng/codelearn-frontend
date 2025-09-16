import { useState } from "react";
import { Button } from "../Buttons";

export default function DescriptionWithFade({ children, className = "" }) {
  const [isShowAll, setIsShowAll] = useState(false);
  return (
    <div className={className}>
      <div
        className={`
          ${!isShowAll && "max-h-[200px]"} overflow-hidden relative`}
      >
        {children}
        {!isShowAll && (
          <span
            className="block absolute bottom-0 left-0 right-0 h-[200px] 
        bg-[linear-gradient(to_top,_rgba(248,250,252,1)_18%,_transparent_100%)] 
        dark:bg-[linear-gradient(to_top,_rgba(30,41,59,1)_18%,_transparent_100%)]
        "
          ></span>
        )}
      </div>
      <Button
        onClick={() => {
          setIsShowAll((prev) => !prev);
        }}
        className={`
          sticky accent-outline text-xs font-dana-md mx-auto w-fit 
          ${isShowAll && "mt-5"}
        `}
      >
        {isShowAll ? "کم تر" : "بیشتر"}
      </Button>
    </div>
  );
}
