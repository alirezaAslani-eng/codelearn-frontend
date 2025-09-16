import { useContext, useMemo, useRef, useState } from "react";
import {
  Form,
  LoadeingErrorHandler,
  Opacity,
} from "../../../components/Modules";
import { AuthContext } from "../../../context";
import {
  Button,
  SerevrError,
  Spiner,
  TitleWithEffect,
  TopMessage,
  UserPanelInput,
} from "../../../components/Ui";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlinePencil,
  HiOutlineDeviceMobile,
  HiOutlineKey,
} from "../../../components/Ui/icons/icons";
import {
  allInputNames,
  EditUserValidations as schema,
} from "../../../constant/form";
import { putEditUser } from "../../../api";
import { useModal } from "react-modal-hook";
import { SmileIcon } from "../../../assist/svg";
import { AnimatePresence, motion } from "framer-motion";
import { getUserPanelMotionConfig } from "../../../constant/animationConfig";
export default function UserDetails() {
  const [isDisabledForm, seIsDisabledForm] = useState(true);
  const formRef = useRef();
  // Context to get user details and refetch theme  ---- >
  const {
    userInfo,
    isPending: userLoading,
    userToken,
    refetchMe,
    isError: userError,
  } = useContext(AuthContext);
  // Modal to show the result ----- >
  const [showGoodMessage, hiddenGoodMessage] = useModal(() => {
    return (
      <TopMessage
        isOpen
        result="success"
        message={
          <div className="flex items-center _840:items-start gap-x-2">
            {`اطلاعات تغیر کرد`}
            <SmileIcon className="w-6 h-6" />
          </div>
        }
        onClose={hiddenGoodMessage}
      />
    );
  });
  const [showBadMessage, hiddenBadMessage] = useModal(() => {
    return (
      <TopMessage
        isOpen
        result="error"
        message={
          <div className="flex items-center gap-x-2">
            {`خطا سرور`}
            <SmileIcon className="w-6 h-6" />
          </div>
        }
        onClose={hiddenBadMessage}
      />
    );
  });
  // dispatch event for form builder -> <Form/> -- >
  const submiEventDispatcher = () => [
    formRef.current?.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    ),
  ];
  // submit event to put user info --- >
  const submited = async (form) => {
    try {
      const res = await putEditUser({
        body: form,
        headers: { Authorization: `Bearer ${userToken}` },
      });
      showGoodMessage();
      seIsDisabledForm(true);
      refetchMe();
    } catch (err) {
      showBadMessage();
      console.log(err);
    }
  };
  // memoized inputs arry to send theme to <Form /> --- >
  const inputs = useMemo(() => {
    return [
      {
        name: allInputNames.fullName,
        type: "text",
        InputComponent: (props) => {
          const { field } = props;
          return (
            <UserPanelInput
              label="نام کامل"
              inputProps={{ ...field }}
              icon={
                <HiOutlinePencil className="dark:text-light/70 text-dark/70 w-6 h-6" />
              }
            />
          );
        },
      },
      {
        name: allInputNames.userName,
        type: "text",
        InputComponent: (props) => {
          const { field } = props;
          return (
            <UserPanelInput
              label="نام کاربری"
              inputProps={{ ...field, placeholder: "نام کاربری" }}
              icon={
                <HiOutlineUser className="dark:text-light/70 text-dark/70 w-6 h-6" />
              }
            />
          );
        },
      },
      {
        name: allInputNames.email,
        type: "text",
        InputComponent: (props) => {
          const { field } = props;
          return (
            <UserPanelInput
              label="ایمیل"
              icon={
                <HiOutlineMail className="dark:text-light/70 text-dark/70 w-6 h-6" />
              }
              inputProps={{ ...field }}
            />
          );
        },
      },
      {
        name: allInputNames.phone,
        type: "text",
        InputComponent: (props) => {
          const { field } = props;
          return (
            <UserPanelInput
              label="شماره تماس"
              inputProps={{ ...field }}
              icon={
                <HiOutlineDeviceMobile className="dark:text-light/70 text-dark/70 w-6 h-6" />
              }
            />
          );
        },
      },
      {
        name: allInputNames.password,
        type: "text",
        InputComponent: (props) => {
          const { field } = props;
          return (
            <>
              {!isDisabledForm && (
                <Opacity duration={0.3}>
                  <UserPanelInput
                    label="رمز عبور جدید"
                    inputProps={{ ...field }}
                    icon={
                      <HiOutlineKey className="dark:text-light/70 text-dark/70 w-6 h-6" />
                    }
                  />
                </Opacity>
              )}
            </>
          );
        },
      },
    ];
  }, [isDisabledForm]);

  return (
    <motion.div
      {...getUserPanelMotionConfig()}
      key={"UserDetails"}
      className="font-dana-md h-full"
    >
      <div className="mb-10 flex items-center justify-between flex-wrap">
        <TitleWithEffect>جزعیات حساب کاربری</TitleWithEffect>
        <AnimatePresence mode="wait">
          {isDisabledForm && (
            <Opacity key={"edit"}>
              <Button
                onClick={() => seIsDisabledForm(false)}
                className="accent-outline text-xs"
              >
                ویرایش
              </Button>
            </Opacity>
          )}
          {!isDisabledForm && (
            <Opacity key={"cancelEdit"}>
              <Button
                onClick={() => seIsDisabledForm(true)}
                className="accent-outline text-xs"
              >
                لغو
              </Button>
            </Opacity>
          )}
        </AnimatePresence>
      </div>

      <LoadeingErrorHandler
        isError={{
          error: (
            <div className="abs-center">
              <SerevrError />
            </div>
          ),
          check: userError,
        }}
        isLoading={{
          loading: (
            <div className="abs-center">
              <Spiner text="در حال بارگیری" />
            </div>
          ),
          check: userLoading,
        }}
      >
        <Form
          ref={formRef}
          submitButton={false}
          formTagClassName="grid md:grid-cols-2 gap-4 _840:gap-6"
          defaultValues={{
            [allInputNames.fullName]: userInfo?.name,
            [allInputNames.userName]: userInfo?.username,
            [allInputNames.email]: userInfo?.email,
            [allInputNames.phone]: userInfo?.phone,
          }}
          disabled={isDisabledForm}
          onSubmit={submited}
          schema={schema}
          inputs={inputs}
        />
        <AnimatePresence>
          {!isDisabledForm && (
            <Opacity key={"register"} duration={0.3}>
              <Button
                className="accent-outline text-sm mt-10"
                onClick={submiEventDispatcher}
              >
                ثبت تقیرات
              </Button>
            </Opacity>
          )}
        </AnimatePresence>
      </LoadeingErrorHandler>
    </motion.div>
  );
}
