import { useNavigate } from "react-router-dom";
import { useCallback, useContext } from "react";
// component -- >
import { loginValidations } from "../../constant/form";
import { BlurPageBackGround, Form } from "../../components/Ui";
// hook -- >
import { useCallPostLoginUser } from "../../hooks/callApi";
// Contex -- >
import { AuthContext } from "../../context";
import { ShowErrorContext } from "../../context/ShowErrorContext";
import { Main } from "../../routes/clientPath";
export default function Login() {
  const { loginUserAsync } = useCallPostLoginUser();
  const navigator = useNavigate();
  const authContext = useContext(AuthContext);
  const { addError } = useContext(ShowErrorContext);
  const submiting = useCallback(async (formValue) => {
    // use Async because <Form/> shoud get a Async method to handle disabled form while submiting .
    try {
      await loginUserAsync(
        {
          body: { identifier: formValue?.email, password: formValue?.password },
        },
        {
          onSuccess: (success) => {
            authContext.login(success.response?.accessToken);
            navigator("/"+Main.root);
          },
          onError: (error) => {
            addError({ text: (error?.response?.message || error?.response) || "مشکلی رخ داده !" });
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <BlurPageBackGround>
        <div className="min-h-screen text-dark dark:text-light flex justify-center items-center px-4">
          <section className="w-[min(400px,100%)]">
            <Form
              loginForm={true}
              schema={loginValidations}
              onSubmit={submiting}
              title="ورود به کد لرن"
              subTitle="خوش اومدی !"
            />
          </section>
        </div>
      </BlurPageBackGround>
    </>
  );
}
