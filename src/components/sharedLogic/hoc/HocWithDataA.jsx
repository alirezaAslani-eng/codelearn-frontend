import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

const defultConfig = {
  queryKey: [],
};
export default function hocWithDataA(config) {

  return (Component) => {
    return memo(function WithWrapper(props) {
      const { queryKey } = {
        ...defultConfig,
        ...config,
      };
      //  HOOK --- >
      const { data, isError, isLoading } = useQuery({ queryKey });
      return (
        <Component
          isLoading={isLoading}
          isError={isError}
          data={data}
          {...props}
        />
      );
    });
  };
  
}
