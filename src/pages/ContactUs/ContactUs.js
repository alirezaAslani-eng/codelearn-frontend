import { useCallback, useContext } from "react";
import { Form, BlurPageBackGround } from "../../components/Ui";
import ResultModal from "../../components/Ui/Modals/TopMessage";
import { contactUsValidations } from "../../constant/form";
import { useCallPostContactMessage } from "../../hooks/callApi";
import { ShowErrorContext } from "../../context/ShowErrorContext";
import { useModal } from "react-modal-hook";
export default function ContactUs() {
  // hook -- >
  const { contactMessageAsync } = useCallPostContactMessage();
  const { addError } = useContext(ShowErrorContext);
  // Success Result -- >
  const [showGoodMessage, hiddenGoodMessage] = useModal(() => {
    return (
      <ResultModal
        result="success"
        isOpen
        message="ممنون از پیقام شما"
        onClose={hiddenGoodMessage}
      />
    );
  });
  const submiting = useCallback(async (formValue) => {
    // use Async because <Form/> shoud get a Async method to handle disabled form while submiting .
    try {
      await contactMessageAsync(
        {
          body: formValue,
        },
        {
          onSuccess: (success) => {
            showGoodMessage();
          },
          onError: (error) => {
            addError({
              text:
                error.response?.message || error.response || "مشکلی رخ داده !",
            });
          },
        }
      );
    } catch (err) {}
    
    
  }, []);
  return (
    <>
      <BlurPageBackGround>
        <div className="min-h-screen text-dark dark:text-light flex justify-center items-center px-4">
          <section className="w-[min(400px,100%)]">
            <Form
              subtitle="نظر شما برای ما با ارزش هست"
              title="ممنون از اهمیت شما"
              onSubmit={submiting}
              contactUsForm={true}
              schema={contactUsValidations}
            />
          </section>
        </div>
      </BlurPageBackGround>
    </>
  );
}
