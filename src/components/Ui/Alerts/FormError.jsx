import { useEffect, useState } from "react";
import { HiX } from "../icons/icons";
import { Button } from "../Buttons";
export default function FormError({
  text = "",
  rmTime = 4000,
  onRemove = () => {},
}) {
  const [isShowMe, setIsShowMe] = useState(true); // Reamining Show Error
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowMe(false);
      onRemove();
    }, rmTime);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <>
      {isShowMe && (
        <div className="bg-red-900/30 backdrop-blur-lg text-red-500 rounded-xl overflow-x-hidden w-full font-dana-md">
          <div className="flex justify-between items-center gap-4 p-3">
            <span className="block">{text}</span>
            <Button
              className="danger-btn"
              onClick={() => {
                setIsShowMe(false);
              }}
            >
              <HiX onClick={() => setIsShowMe(false)} />
            </Button>
          </div>
          <div className="h-[5px] bg-red-500 w-full animate-reaminingLine  "></div>
        </div>
      )}
    </>
  );
}
