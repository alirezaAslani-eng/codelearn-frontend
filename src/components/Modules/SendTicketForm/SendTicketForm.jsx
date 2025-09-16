import { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { GetOneTicketDepartment, postOneTicket } from "../../../api";
import {
  Button,
  TopMessage,
  SelectInput,
  UserPanelInput,
  Spiner,
} from "../../../components/Ui";
import { HiQuestionMarkCircle } from "../../../components/Ui/icons/icons";
import { SmileIcon } from "../../../assist/svg";
import {
  allInputNames,
  TicketValidations as schema,
} from "../../../constant/form";
import { AuthContext } from "../../../context";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";
import { useModal } from "react-modal-hook";
import { motion } from "framer-motion";
import { useCheckInitMount } from "../../../hooks";
export default function SendTicket() {
  // check initial mount and remove it after a while ---- >
  // use this value to check the first mount and cancel the submit animate at first mount
  const { isInitialMount } = useCheckInitMount({
    removeTime: 100,
  });
  // Form handling ------- >
  const {
    control,
    register,
    watch,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const departmentId = watch(allInputNames.departmentID);
  // get user details from context ----- >
  const {
    userToken,
    userInfo,
    isPending: userLoading,
    isError: userError,
  } = useContext(AuthContext);
  // get departments from server to show theme in a select input --- >
  const {
    data: departments,
    isLoading: departmentLoading,
    isError: departmentError,
  } = useQuery({
    queryKey: queryKeys.ticketDepartments.all,
  });
  // get subDepartMents when departments changed and show them in another select input --- >
  const {
    data: subDepartments,
    isLoading: subDepartLoading,
    isError: subDepartErro,
  } = useQuery({
    enabled: !!departmentId,
    queryKey: queryKeys.ticketDepartments.subDepartMents(departmentId),
    queryFn: () => {
      return GetOneTicketDepartment({
        param: departmentId,
      });
    },
  });
  // React hook modal / modal logic section --- >

  const [showResultFine, closeResultFine] = useModal(() => {
    return (
      <TopMessage
        message={
          <div className="flex items-center gap-x-2">
            ممنون از تیکت شما
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
        message=" ! خطا سرور"
        result="error"
        isOpen
        onClose={closeResultBad}
      />
    );
  });

  // submit method to post this form ---- >
  const submited = async (form) => {
    try {
      const res = await postOneTicket({
        headers: { Authorization: `Bearer ${userToken}` },
        body: form?.course
          ? { ...form }
          : {
              departmentID: form?.[allInputNames.departmentID],
              departmentSubID: form?.[allInputNames.departmentSubID],
              body: form?.[allInputNames.body],
              priority: form?.[allInputNames.priority],
              title: form?.[allInputNames.title],
            },
      });
      showResultFine();
    } catch (err) {
      showResultBad();
    }
  };

  // memoized select options that we got theme from server ----- >
  const departmentOptions = useMemo(() => {
    return (
      departments?.map((item) => {
        return { text: item?.title, value: item?._id };
      }) || []
    );
  }, [departments]);
  const subDepartMentOptions = useMemo(() => {
    return (
      subDepartments?.map((item) => {
        return { text: item?.title, value: item?._id };
      }) || []
    );
  }, [subDepartments]);
  const coursesOptions = useMemo(() => {
    return (
      userInfo?.courses
        ?.filter((item) => item)
        ?.map((item) => {
          return { text: item?.name, value: item?._id };
        }) || []
    );
  }, [userInfo?.courses]);
  // priority didn't came from serevr its statick !!
  const priorityOptions = useMemo(() => {
    return (
      ["1", "2", "3"].map((item) => {
        return {
          text:
            item == 1
              ? "معمولی"
              : item == 2
              ? "نسبتا مهم"
              : item == 3
              ? "خیلی مهم هست"
              : "",
          value: item,
        };
      }) || []
    );
  }, []);

  return (
    <form onSubmit={handleSubmit(submited)}>
      <div className="grid xs:grid-cols-2 gap-6">
        <div className="relative">
          <UserPanelInput
            label="عنوان تیکت"
            inputProps={{ ...register(allInputNames.title) }}
            icon={<HiQuestionMarkCircle />}
            isError={errors[allInputNames.title]}
          />
          <span className="block text-sm text-red-500 absolute -bottom-5 right-0">
            {errors[allInputNames.title]?.message ?? ""}
          </span>
        </div>

        <Controller
          name={allInputNames.departmentID}
          control={control}
          render={({ field }) => {
            return (
              <SelectInput
                className="p-3"
                selectProps={{ ...field }}
                label="تیکت به "
                defaultOption={{
                  text: (
                    <LoadeingErrorHandler
                      isLoading={{
                        check: departmentLoading,
                        loading: (
                          <Spiner text="در حال بارگیری" className="!size-5" />
                        ),
                      }}
                      isError={{ check: departmentError, error: "error" }}
                      dataCheck={{
                        check: departmentOptions?.length,
                        error: "انتخاب مجود نیست",
                      }}
                    />
                  ),
                  value: "",
                }}
                options={departmentOptions}
              />
            );
          }}
        />

        <Controller
          name={allInputNames.departmentSubID}
          control={control}
          render={({ field }) => {
            return (
              <SelectInput
                label="کدوم بخش"
                selectProps={{ ...field }}
                defaultOption={{
                  text: (
                    <>
                      {
                        <LoadeingErrorHandler
                          isLoading={{
                            check: subDepartLoading,
                            loading: (
                              <Spiner
                                text="در حال بارگیری"
                                className="!size-5"
                              />
                            ),
                          }}
                          isError={{ check: subDepartErro, error: "error" }}
                          dataCheck={{
                            check: subDepartMentOptions?.length,
                            error: "انتخاب مجود نیست",
                          }}
                        />
                      }
                    </>
                  ),
                  value: "",
                }}
                options={subDepartMentOptions}
              />
            );
          }}
        />

        <Controller
          name={allInputNames.course}
          control={control}
          render={({ field }) => {
            return (
              <SelectInput
                label="برای کدوم دروه (اختیاری)"
                selectProps={{ ...field }}
                defaultOption={{
                  text: (
                    <LoadeingErrorHandler
                      isLoading={{
                        check: userLoading,
                        loading: (
                          <Spiner text="در حال بارگیری" className="!size-5" />
                        ),
                      }}
                      isError={{ check: userError, error: "error" }}
                      dataCheck={{
                        check: coursesOptions?.length,
                        error: "دوره ای ندارید",
                      }}
                    />
                  ),
                  value: "",
                }}
                options={coursesOptions}
              />
            );
          }}
        />

        <Controller
          name={allInputNames.priority}
          control={control}
          render={({ field }) => {
            return (
              <SelectInput
                label="اهمیت تیکت شما"
                selectProps={{ ...field }}
                options={priorityOptions}
              />
            );
          }}
        />

        <div className="relative col-span-full">
          <div className=" flex flex-col font-dana-md text-dark dark:text-light">
            <label htmlFor="text-area" className=" mb-4 text-xs _840:text-sm ">
              {"محتوا تیکت شما"}
            </label>
            <textarea
              id="text-area"
              placeholder="محتوا تیکت ..."
              {...register(allInputNames.body)}
              className={`p-4 text-sm min-h-[200px] outline-none bg-secondary-light dark:bg-secondary-dark rounded-md shadow  border border-transparent transition-all ${
                errors[allInputNames.body]
                  ? "!border-red-500/40 shadow shadow-red-500/40 !text-red-500 !placeholder-red-500/70"
                  : ""
              }`}
            ></textarea>
          </div>
          <span className="block text-sm text-red-500 absolute -bottom-5 right-0">
            {errors[allInputNames.body]?.message ?? ""}
          </span>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-x-2">
        {isSubmitting && <Spiner text="" className="!size-6 _840:!size-10" />}
        <motion.div
          layout="position"
          transition={{ duration: !isInitialMount ? 0.15 : 0 }}
        >
          <Button
            disabled={isSubmitting}
            type="submit"
            className="accent-outline font-dana-md text-sm"
          >
            ارسال تیکت
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
