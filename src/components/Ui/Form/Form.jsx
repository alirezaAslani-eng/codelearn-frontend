import { Link, useNavigate } from "react-router-dom";
// Components >>
import {
  Button,
  TitleWithEffect,
  FormWarning,
  Input,
  TextAreaInput,
  RippleButton,
  Spiner,
} from "..";
// icons
import { HiOutlineArrowCircleLeft } from "../icons/icons";
// Form section import  >>
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { allInputNames } from "../../../constant/form";
import { z } from "zod";
import { Layout } from "../../Modules";
import { fromMain, Main } from "../../../routes/clientPath";
// ----------------------
const defProps = {
  onSubmit: () => {},
  schema: z.object({}),
};
function Form({
  onSubmit = defProps.onSubmit,
  schema = defProps.schema,
  registerForm = false,
  loginForm = false,
  contactUsForm = false,
  title = "عنوان فرم",
  subtitle = "زیر عنوانّ",
}) {
  // React hook form -- >
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const nav = useNavigate();
  const inputs = {
    full_name: (
      <Input
        inputProps={{
          ...register(allInputNames.fullName),
          placeholder: "نام و نام خانوادگی",
        }}
        isError={errors[allInputNames.fullName]}
        errText={errors[allInputNames.fullName]?.message ?? ""}
      />
    ),
    user_name: (
      <Input
        inputProps={{
          ...register(allInputNames.userName),
          placeholder: "نام کاربری",
        }}
        isError={errors[allInputNames.userName]}
        errText={errors[allInputNames.userName]?.message ?? ""}
      />
    ),
    email: (
      <Input
        inputProps={{
          ...register(allInputNames.email),
          placeholder: "ایمیل",
        }}
        isError={errors[allInputNames.email]}
        errText={errors[allInputNames.email]?.message ?? ""}
      />
    ),
    phone: (
      <Input
        inputProps={{
          ...register(allInputNames.phone),
          placeholder: "موبایل",
        }}
        isError={errors[allInputNames.phone]}
        errText={errors[allInputNames.phone]?.message ?? ""}
      />
    ),
    password: (
      <Input
        inputProps={{
          ...register(allInputNames.password),
          placeholder: "رمز",
        }}
        isError={errors[allInputNames.password]}
        errText={errors[allInputNames.password]?.message ?? ""}
      />
    ),
    text_area: (
      <TextAreaInput
        inputProps={{
          ...register(allInputNames.text_area),
          placeholder: "دید گاه تان را بنویسید",
        }}
        isError={errors[allInputNames.text_area]}
        errText={errors[allInputNames.text_area]?.message ?? ""}
      />
    ),
  };

  return (
    <Layout layout="position" className="w-full">
      <fieldset disabled={isSubmitting}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* form > (title) */}
          <div className="flex justify-between items-start">
            <TitleWithEffect secondText={subtitle}>{title}</TitleWithEffect>
            <Button
              onClick={() => nav(-1)}
              className="text-xs accent-outline rounded-full"
            >
              <HiOutlineArrowCircleLeft />
            </Button>
          </div>
          {/* form > inputs ------------------------------>*/}
          <div className="space-y-3">
            {registerForm && (
              <>
                <div className="flex gap-x-4">
                  {inputs.full_name}
                  {inputs.user_name}
                </div>
                {inputs.email}
                {inputs.phone}
                {inputs.password}
              </>
            )}

            {loginForm && (
              <>
                {inputs.email}
                {inputs.password}
              </>
            )}
            {contactUsForm && (
              <>
                {inputs.full_name}
                {inputs.email}
                {inputs.phone}
                {inputs.text_area}
              </>
            )}
          </div>
          {/* Footer form ----> */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              {!contactUsForm && (
                <Link
                  className="success-btn"
                  to={`${
                    loginForm ? fromMain(Main.register) : fromMain(Main.login)
                  }`}
                >
                  {loginForm ? "ایجاد حساب جدید" : "حساب دارم"}
                </Link>
              )}
              {loginForm && (
                <Link className="danger-btn" to={"/foregt-pass"}>
                  {"رمز یادم نیست"}
                </Link>
              )}
            </div>
          </div>
          {/* form > Submit button */}

          <RippleButton type="submit" className="accent-outline w-full">
            {isSubmitting ? (
              <span>کمی صبر کنید</span>
            ) : (
              <>
                {loginForm && "ورود"}
                {contactUsForm && "ارسال پیام"}
                {registerForm && "ثبت نام"}
              </>
            )}
          </RippleButton>

          {/* form > Warning */}
          <FormWarning />
        </form>
      </fieldset>
    </Layout>
  );
}
export default Form;
