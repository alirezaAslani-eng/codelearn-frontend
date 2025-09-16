import { memo, useCallback, useContext } from "react";
import { Portal } from "../../Modules";
import ChatBox from "./ChatBox";
import TitleChatBox from "./TitleChatBox";
import { SendShortMessage } from "../../sharedLogic/renderProps";
import { AuthContext, ToggleActionsContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { fromMain, Main } from "../../../routes/clientPath";

function ChatBoxWithLogic() {
  const { chatBoxHandler, isChatBoxOpen } = useContext(ToggleActionsContext);
  const { isLogin } = useContext(AuthContext);
  const nav = useNavigate();
  const ChatBoxWithData = useCallback(
    ({
      message,
      answer,
      GetMessageLoading,
      sending,
      sendingError,
      setMessage,
    }) => {
      return (
        <>
          <Portal container={"body"}>
            {isChatBoxOpen && (
              <div
                className={` h-[400px] w-[300px] font-dana-md transition-all fixed left-5 bottom-[100px] z-[13]`}
              >
                <ChatBox
                  message={message}
                  answer={answer}
                  isLoadingToGetMsg={GetMessageLoading}
                  isErrorToSend={sendingError}
                  isLoadingToSend={sending}
                  onClose={chatBoxHandler}
                  onSend={(val) => {
                    if (isLogin) setMessage(val);
                    else {
                      nav(fromMain(Main.login));
                      chatBoxHandler(false);
                    }
                  }}
                  title={<TitleChatBox />}
                />
              </div>
            )}
            {isChatBoxOpen && (
              <div
                onClick={() => chatBoxHandler(false)}
                className="w-full h-screen fixed inset-0 z-[11] bg-black/50 backdrop-blur-md"
              ></div>
            )}
          </Portal>
        </>
      );
    },
    [isChatBoxOpen]
  );
  return <SendShortMessage render={ChatBoxWithData} />;
}
export default memo(ChatBoxWithLogic);
