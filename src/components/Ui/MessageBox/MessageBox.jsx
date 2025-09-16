
import { CornerIcon } from "../../../assist/svg";

function MessageBox({
  right = false,
  left = false,
  text = "",
  title = "",
  textClassName = "",
}) {
  return (
    <>
      {right && (
        <div className="flex flex-col font-dana-md">
          <span className="block max-w-full text-dark/80 dark:text-light/80 text-xs _840:text-base pr-2 my-2 animate-initialShow">
            {title}
          </span>
          <div className="relative w-fitt max-w-full bg-bg-accent p-3 rounded-[_8px_8px_0px_8px] animate-initShowFromRight ">
            <CornerIcon className="size-5 absolute right-0 bottom-0 translate-x-full rotate-180 text-bg-accent" />
            <p className={`break-words text-dark ${textClassName}`}>{text}</p>
          </div>
        </div>
      )}
      {left && (
        <div className="flex flex-col font-dana-md max-w-full">
          <span className="block text-dark/80 pl-2 dark:text-light/80 my-2 animate-initialShow">
            {title}
          </span>
          <div className="relative w-fit max-w-full bg-green-500 text-light/90 p-3 rounded-[_8px_8px_8px_0px] animate-initShowFromLeft">
            <CornerIcon className="size-5 absolute left-0 bottom-0 -translate-x-full rotate-90 text-green-500" />
            <p className={`break-words ${textClassName}`}>{text}</p>
          </div>
        </div>
      )}
    </>
  );
}
export default MessageBox
