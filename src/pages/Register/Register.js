import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
/// component --- >
import { BlurPageBackGround, Form } from "../../components/Ui";
// framer-motion -->
// constant -- >
import { registerValidations } from "../../constant/form";
// hook -- >
import { useCallPostOneUser } from "../../hooks/callApi";
// Context -- >
import { AuthContext } from "../../context";
import { CornerIcon } from "../../assist/svg";
import { ShowErrorContext } from "../../context/ShowErrorContext";
import { Main } from "../../routes/clientPath";
export default function Register() {
  // hook -- >
  const { createUserAsync } = useCallPostOneUser();
  const authContext = useContext(AuthContext);
  const { addError } = useContext(ShowErrorContext);
  const navigateor = useNavigate();

  const submiting = useCallback(async (form) => {
    // use Async because <Form/> shoud get a Async method to handle disabled form while submiting .
    try {
      await createUserAsync(
        { body: { ...form, confirmPassword: form?.password } }, // Body request .
        // Response :
        {
          onSuccess: (success) => {
            authContext.login(
              success.response?.accessToken,
              success.response?.user
            );
            navigateor("/" + Main.root);
          },
          onError: (err) => {
            addError({
              text:
                err?.response?.message || err?.response || "مشکلی رخ داده !",
            });
          },
        }
      );
    } catch (err) {}
  });
  return (
    <>
      <BlurPageBackGround>
        {/* Register  Form */}
        <div className="flex items-center justify-center min-h-screen p-5">
          <div className="w-[min(400px,100%)]">
            <Form
              registerForm={true}
              schema={registerValidations}
              onSubmit={submiting}
              title="ثبت نام"
              subtitle="به کد لرن خوش اومدی عزیز"
            />
          </div>
        </div>
      </BlurPageBackGround>
    </>
  );
}
