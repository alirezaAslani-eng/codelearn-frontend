import { useEffect, useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import Input from "../Input/Input";
import { Button } from "../Buttons";
import { HiOutlineLink, HiX, HiOutlineArrowCircleLeft } from "../icons/icons";
import NoMessage from "./NoMessage";
import Spiner from "../Loaders/Spiner";
import { LoadeingErrorHandler } from "../../Modules";
import { AuthContext } from "../../../context";
import { fromUser, userPanel } from "../../../routes/clientPath";
const defProps = {
  onSend: () => {},
  onClose: () => {},
};
export default function ChatBox({
  // data -- >
  message = "",
  answer = "",
  title = <></>,
  // event -- >
  onSend = defProps.onSend,
  onClose = defProps.onClose,
  // to get a message
  isLoadingToGetMsg = true,
  isErrorToGetMsg = false,
  // to send a message
  isLoadingToSend = false,
  isErrorToSend = false,
  // Option -- >
  autoFocus = false,
}) {
  const [inputMessage, setMessage] = useState("");

  useEffect(() => {
    // to empty input while user coud send a message -- >
    if (isLoadingToSend) return;
    if (!isErrorToSend) setMessage("");
  }, [isLoadingToSend, isErrorToSend]);
  return (
    <div className="w-full h-full p-3 flex flex-col justify-between _840:rounded-lg bg-secondary-light dark:bg-secondary-dark shadow overflow-y-auto">
      <section className="text-sm text-dark/70 dark:text-light/70 ">
        {/* Headre ------------ > */}
        <div className="flex justify-between items-center">
          <Button onClick={() => onClose(false)} className="danger-btn">
            <HiX />
          </Button>
          {message ? (
            <Button
              onClick={() => onClose(false)}
              to={fromUser(userPanel.tickets)}
              className="success-text !text-xs"
            >
              مشاهده همه
              <HiOutlineArrowCircleLeft />
            </Button>
          ) : (
            <div></div>
          )}
        </div>
        {/* Title */}

        {title}
      </section>
      {/* Body ------------ > */}
      <LoadeingErrorHandler
        isLoading={{
          loading: <Spiner text="" />,
          check: isLoadingToGetMsg,
        }}
      >
        {message ? (
          <div className="px-4 mb-4  overflow-y-auto overflow-x-hidden flex-1 accent-scroll">
            {/* User Message */}
            <div className="flex justify-start">
              <MessageBox
                textClassName="line-clamp-4 text-sm"
                right
                text={answer || "پاسخی دریافت نشده !"}
              />
            </div>
            <div className="flex justify-end">
              <MessageBox
                textClassName="line-clamp-4 text-sm"
                left
                text={message}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <NoMessage text="پیامی هنوز ثیت نشده !" />
          </div>
        )}
      </LoadeingErrorHandler>

      <section>
        {/* Message Input ---- >  */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend(inputMessage);
          }}
          className="flex items-center gap-x-2"
        >
          <LoadeingErrorHandler
            isLoading={{
              loading: <Spiner text="" className="!size-8" />,
              check: isLoadingToSend,
            }}
          >
            <Button
              type="submit"
              className="!p-3 accent-outline transition-all active:scale-[0.90]"
            >
              <HiOutlineLink />
            </Button>
          </LoadeingErrorHandler>
          <Input
            inputProps={{
              placeholder: "ما درخدمتیم : ",
              onChange: (e) => setMessage(e?.target?.value),
              value: inputMessage,
              autoFocus: autoFocus,
            }}
            label={false}
            placeholder="ما در خدمتیم"
            className="!bg-primary-light dark:!bg-primary-dark"
          />
        </form>
      </section>
    </div>
  );
}
