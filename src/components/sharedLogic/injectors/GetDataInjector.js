import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
export default memo(function GetDataInjector({ Component, queryKey }) {
  const { data, isLoading, isError ,fetchStatus} = useQuery({ queryKey });
  if (isLoading) return null;
  else if (isError) return null;
  return <Component data={data} />;
});
 