import { zodResolver } from "@hookform/resolvers/zod";
import  { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
const defProps = {
  inputs: [],
  defaultValues: {},
  schema: null,
  onSubmit: async () => {},
  formTagClassName: "",
  submitButton: <button type="submit">submit button jsx</button>,
  disabled: false,
};
export default forwardRef(function Form(props, ref) {
  const {
    inputs,
    schema,
    onSubmit,
    formTagClassName,
    submitButton,
    defaultValues,
    disabled,
  } = {
    ...defProps,
    ...props,
  };
  // handled by react hook form version 7.56.0 .
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });

  return (
    <fieldset disabled={disabled ? disabled : isSubmitting}>
      <form
        className={`${formTagClassName}`}
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
      >
        {inputs?.map((Item, index) => {
          if (!!Item?.InputComponent) {
            return (
              <Controller
                key={index}
                name={Item?.name}
                control={control}
                render={(fieldObject) => {
                  const { field } = fieldObject;
                  return (
                    <Item.InputComponent
                      field={{
                        ...field,
                        // Required Props
                        name: field.name,
                        type: Item?.type || "",
                      }}
                      manualSetValue={setValue}
                      error={errors?.[Item?.name]?.message}
                    />
                  );
                }}
              />
            );
          }
        })}
        {submitButton ? submitButton : null}
      </form>
    </fieldset>
  );
});
