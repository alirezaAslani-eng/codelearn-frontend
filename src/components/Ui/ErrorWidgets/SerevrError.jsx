import { ServerErrorIcon } from "../../../assist/svg";

export default function SerevrError({
  text = "خطا سرور",
  className = "size-[50px] _840:size-[100px] text-red-500",
}) {
  return (
    <div className="flex items-center justify-center font-dana-md animate-initialShow">
      <div className="flex-col flex justify-center items-center gap-3 bg-red-500/30 p-5 rounded-xl">
        <ServerErrorIcon className={className} />
        <p className="text-dark/80 dark:text-light/80 text-xs _840:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}
