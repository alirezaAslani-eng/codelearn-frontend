import { HiOutlineInbox } from "../icons/icons";
export default function NoMessage({ text }) {
  return (
    <div className="flex items-center gap-x-2">
      {text}
      <HiOutlineInbox className="size-6" />
    </div>
  );
}
