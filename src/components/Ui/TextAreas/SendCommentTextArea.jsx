import { useEffect } from "react";
import { Button, InputStars, Spiner } from "../../Ui/index";
import { Link } from "react-router-dom";
import { fromMain, Main } from "../../../routes/clientPath";
// form config -- >
import { Controller, useForm } from "react-hook-form";
import { sendCommentValidations as schema } from "../../../constant/form/validations";
import { allInputNames } from "../../../constant/form";
import { zodResolver } from "@hookform/resolvers/zod";
const defProps = {
  onSubmit: () => {},
};
export default function SendCommentTextArea({
  // State ----------------------- -- >
  isLogin = false,
  isPending = false,
  isError = false,
  // Data ------------------------- >
  placeholder = "",
  title = "",
  buttonText = "ارسال نظر",
  notLoginText = "لطفا اول وارد شوید",
  courseShortName = "",
  defaultScore = "5",
  // Option ------------------------ >
  stars = true,
  // Events --------------------- >
  onSubmit = defProps.onSubmit,
}) {
  // Handled By form hook !!
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      [allInputNames?.score]: defaultScore, // set default score !
    },
  });
  // Events -- >
  const submited = async (form) => {
    onSubmit({
      courseShortName,
      body: form?.[allInputNames.body],
      score: form?.[allInputNames?.score],
    });
  };
  // avoiding Remount --- >
  const InputStarsWithLogic = ({ field }) => {
    return <InputStars inputProps={{ ...field }} />;
  };
  useEffect(() => {
    if (isPending) return;
    else if (isError) return;
    else reset();
  }, [isPending, isError]);
  return (
    <div className="font-dana-md">
      {title && (
        <span className="text-dark dark:text-light text-xl  mb-5">{title}</span>
      )}
      <form layout="size" onSubmit={handleSubmit(submited)}>
        <textarea
          layout="position"
          {...register(allInputNames.body)}
          className={`
          w-full 
          min-h-[150px] 
          max-h-[150px] 
          p-3 
          bg-primary-light 
          dark:bg-primary-dark 
          outline-none 
          text-dark 
          dark:text-light
          rounded-lg
          shadow
          border
          ${
            errors[allInputNames.body]
              ? "border-red-500/40"
              : "border-transparent"
          }`}
          placeholder={placeholder}
        ></textarea>
        {/* Error section -- >*/}
        {errors[allInputNames.body] ? (
          <span className="text-red-500">
            {errors[allInputNames.body]?.message}
          </span>
        ) : null}
        {/* submit button section -- > */}
        {!stars && (
          <Button type="submit" className="accent mt-3">
            {buttonText}
          </Button>
        )}

        {/* comment with score --> */}
        {stars && (
          <div className="flex items-center justify-between">
            <Button
              disabled={!isLogin}
              type="submit"
              className="accent mt-3 min-w-[86px]"
            >
              {isPending ? (
                <Spiner className="!size-5 !text-dark" text="" />
              ) : (
                "ارسال نظر"
              )}
            </Button>
            {isLogin ? (
              <Controller
                name={allInputNames.score}
                control={control}
                render={InputStarsWithLogic}
              />
            ) : (
              <Link className="danger-btn" to={fromMain(Main.login)}>
                {notLoginText}
              </Link>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
