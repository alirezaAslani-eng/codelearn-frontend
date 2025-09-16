import { OpenFolderIcon } from "../../../assist/svg";

export default function NoCoursesUserPanel({
  text = "دوره درحال یادیگیری ندارید",
  className = "size-[50px] _840:size-[100px] text-bg-accent",
}) {
  return (
    <div className="flex items-center justify-center font-dana-md">
      <div className="flex-col flex justify-center items-center gap-3 bg-bg-accent/30 p-5 rounded-xl">
        <OpenFolderIcon className={className} />
        <p className="text-dark/80 dark:text-light/80 text-xs _840:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}
