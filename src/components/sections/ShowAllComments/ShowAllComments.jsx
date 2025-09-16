import  { memo } from "react";
import { CommentBox } from "../../Ui";
const defProps = {
  data: [],
};
export default memo(function ShowAllComments({ data = defProps.data }) {
  const commentsJsx = () => {
    if (data?.length)
      return (
        <div className="mt-6 space-y-6">
          {data?.map((item) => {
            return <CommentBox key={item?._id} {...item} />;
          })}
        </div>
      );
  };
  const CommentsJsx = commentsJsx();
  return <>{CommentsJsx}</>;
});
