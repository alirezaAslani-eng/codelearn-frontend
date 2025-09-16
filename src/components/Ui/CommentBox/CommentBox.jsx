import { memo } from "react";

const defProps = {
  creator: {},
  answerContent: {},
};
export default memo(function CommentBox(props) {
  const {
    body = "",
    creator,
    createdAt = "",
    answerContent,
    answer = "",
  } = {
    ...defProps,
    ...props,
  };
  return (
    <div className="font-dana-md text-dark dark:text-light boxContainerPrimary">
      {/* commentBox / header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm">{creator?.name}</span>
        <span className="text-xs text-bg-accent">{creator?.role}</span>
      </div>
      <span className="text-xs mt-3">{createdAt?.slice(0, 10)}</span>
      {/* Body */}
      <div className="mt-3 text-sm p-2 break-words border-r border-secondary-dark/50 dark:border-secondary-light/50">{body}</div>
      {/* Answers */}
      {answerContent && (
        <div className="mt-3 boxContainer text-xs">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm">{answerContent?.creator.name}</span>
              <span className="text-xs text-bg-accent">
                {answerContent?.creator?.role}
              </span>
            </div>
            <span className="text-xs mt-3 ">
              {answerContent.createdAt.slice(0, 10)}
            </span>
          </div>
          {/* <span className="text-bg-accent inline">{"پاسخ : "}</span> */}
          <div className="p-2 border-r border-secondary-dark/50 dark:border-secondary-light/50">
          {answerContent.body}
            </div>
        </div>
      )}
    </div>
  );
});
