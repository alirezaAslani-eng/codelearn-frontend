import { HiOutlineChatAlt2, HiOutlineUserGroup } from "../icons/icons";
export default function ViewCommentCounter({ viewCount = "20", commentCount }) {
  return (
    <div className="w-full h-full font-dana-md text-dark dark:text-light flex justify-center">
      <div className="flex items-center h-full">
        <div className="flex items-center gap-2">
          <HiOutlineChatAlt2 className="size-6" />
          <span>{commentCount + " "}کامنت</span>
        </div>
        <span className="solidY mx-5"></span>
        <div className="flex items-center gap-2">
          <HiOutlineUserGroup className="size-6" />
          <span>{viewCount + " "}بازدید</span>
        </div>
      </div>
    </div>
  );
}
