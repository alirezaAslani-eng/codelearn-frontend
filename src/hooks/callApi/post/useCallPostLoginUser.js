import { postLoginUser } from "../../../api";
import { useMutation } from "@tanstack/react-query";
const useCallPostLoginUser = () => {
  // this hook responsible for cali api to create a user .
  const { mutate, mutateAsync } = useMutation({
    mutationFn: postLoginUser,
  });
  return { loginUser: mutate, loginUserAsync: mutateAsync };
};

export default useCallPostLoginUser;
