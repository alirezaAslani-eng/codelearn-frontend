import { useContext } from "react";
import { SendShortMessage } from "../../components/sharedLogic/renderProps";
import { ChatBox } from "../../components/Ui";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import TitleChatBox from "../../components/Ui/ChatBox/TitleChatBox";
import { fromMain, Main } from "../../routes/clientPath";
export default function MobileChat() {
  const nav = useNavigate();
  const { isLogin } = useContext(AuthContext);
  const ChatBoxWithLogic = ({
    message,
    answer,
    GetMessageLoading,
    sending,
    sendingError,
    setMessage,
  }) => {
    return (
      <ChatBox
        autoFocus
        title={<TitleChatBox />}
        answer={answer || ""}
        message={message || ""}
        isErrorToSend={sendingError}
        isLoadingToGetMsg={GetMessageLoading}
        isLoadingToSend={sending}
        onClose={() => nav(-1)}
        
        onSend={(value) => {
          if (isLogin) setMessage(value);
          else nav(fromMain(Main.login));
        }}
      />
    );
  };
  return (
    <div className="h-[calc(100vh)] font-dana-md">
      <SendShortMessage render={ChatBoxWithLogic} />
    </div>
  );
}
