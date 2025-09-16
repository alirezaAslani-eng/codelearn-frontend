import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

const defultConfig = {
  queryKey: [],
  Fallback: () => <p></p>,
  ErrorComponetnt: () => <p></p>,
};
export default function hocWithData(config) {
  
  return (Component) => {
    return memo(function WithWrapper(props) {
      const { queryKey, Fallback, ErrorComponetnt } = {
        ...defultConfig,
        ...config,
      };
      //  HOOK --- >
      const { data, isError, isLoading } = useQuery({ queryKey });
      // waitnig to get data and return a Component with data .
      if (isLoading) return <Fallback /> || <i></i>;
      else if (isError) return <ErrorComponetnt /> || <i></i>;
      return <Component data={data} {...props} />;
    });
  };
  //|
  //|
  //|
  //|
  //|
}
