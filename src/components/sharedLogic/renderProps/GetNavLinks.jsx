import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { memo } from "react";
const defProps = {
  render: () => {},
};
function GetNavLinks({ render = defProps.render }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.topBarLies.all,
  });


  return render({ data, isLoading, isError });
}

export default memo(GetNavLinks);
