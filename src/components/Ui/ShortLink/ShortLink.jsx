import { useEffect, useState } from "react";
import { HiOutlineLink } from "../icons/icons";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { clientRoute } from "../../../constant/SerevrRoute";
export default function ShortLink() {
  const [isCopied, setIsCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isCopied) return;
    const timeOut = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isCopied]);
  return (
    <div className="text-dark dark:text-light">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <HiOutlineLink className="icon" />
          لینک کوتاه
        </span>
        <button
          onClick={() => {
            copy(clientRoute + location.pathname);
            setIsCopied(true);
          }}
          className="p-2 border text-sm rounded-xl "
        >
          {isCopied ? "کپی شد" : "کپی"}
        </button>
      </div>
      <p className="line-clamp-1 hover:text-bg-accent mt-3">
        {clientRoute + location.pathname}
      </p>
    </div>
  );
}
