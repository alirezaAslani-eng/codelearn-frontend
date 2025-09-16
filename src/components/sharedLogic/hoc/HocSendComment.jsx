import { useMutation } from "@tanstack/react-query";
import {  postOneComment } from "../../../api";
import { memo, useContext } from "react";
import { AuthContext } from "../../../context";
import { useModal } from "react-modal-hook";
import { TopMessage } from "../../Ui";
import { SmileIcon } from "../../../assist/svg";

function HocSendComment(Component) {
  function WithData(props) {
    const { userToken, isLogin, isError } = useContext(AuthContext);
    // Modal -- >
    const [showResultFine, closeResultFine] = useModal(() => {
      return (
        <TopMessage
          message={
            <div className="flex items-center gap-x-2">
              ممنون از کامنت شما
              <SmileIcon className="w-6 h-6" />
            </div>
          }
          isOpen
          stillTime={3000}
          onClose={closeResultFine}
        />
      );
    });
    const [showResultBad, closeResultBad] = useModal(() => {
      return (
        <TopMessage
          message={
            <div className="flex items-center gap-x-2">
              مشکلی پیش اومده مجددا امتحان کنید
            </div>
          }
          isOpen
          stillTime={3000}
          onClose={closeResultBad}
          result="warning"
        />
      );
    });
    // Send Comment Logic --- >
    const { isPending, mutateAsync: SendComment } = useMutation({
      mutationFn: postOneComment,
    });
    const sendComment = async (form) => {
      const { body = "", score = "", courseShortName = "" } = form;
      try {
        await SendComment({
          body: {
            body,
            score,
            courseShortName,
          },
          headers: { Authorization: `Bearer ${userToken}` },
        });
        showResultFine();
      } catch (err) {
        showResultBad();
        console.log(err);
      }
    };
    return (
      <Component
        onSubmit={sendComment}
        isLogin={isLogin}
        isPending={isPending}
        isError={isError}
        {...props}
      />
    );
  }
  return memo(WithData);
}

export default HocSendComment;
