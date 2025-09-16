import  { useEffect, useState } from "react";

export default function useCheckInitMount({ removeTime = 200 }) {
  const [isInitialMount, setInitialMout] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setInitialMout(false); // remove first monut !
    }, removeTime);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  return { isInitialMount };
}
