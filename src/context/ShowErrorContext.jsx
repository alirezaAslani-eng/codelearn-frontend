import { createContext, useEffect, useState } from "react";
import { Portal } from "../components/Modules";
import { FormError } from "../components/Ui";
const ShowErrorContext = createContext({
  addError: ({ text = "" } = {}) => {},
});
export default function ShowErrorProvider({ children }) {
  const [errors, setErrors] = useState([]);

  let id = 0;
  const addError = ({ text = "" } = {}) => {
    id++;
    setErrors((prev) => [...prev, { text, rmTime: 4000, id }]);
  };

  useEffect(() => {
    if (!errors.length) return;
    const timeOut = setTimeout(() => {
      setErrors([]);
    }, 4000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [errors.length]);

  return (
    <>
      <ShowErrorContext.Provider value={{ addError }}>
        {children}
      </ShowErrorContext.Provider>
      <Portal container={"body"}>
        {errors?.length ? (
          <div className="space-y-3 p-3 fixed top-0 right-0 z-[500] w-[min(400px,100%)]">
            {errors?.map((err) => {
              return (
                <FormError
                  key={err?.id}
                  text={err?.text}
                  rmTime={err?.rmTime || 4000}
                />
              );
            })}
          </div>
        ) : null}
      </Portal>
    </>
  );
}

export { ShowErrorProvider, ShowErrorContext };
