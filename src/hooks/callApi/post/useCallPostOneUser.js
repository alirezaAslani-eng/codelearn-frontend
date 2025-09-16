import { postOneUser } from "../../../api";
import { useMutation } from "@tanstack/react-query";
const useCallPostOneUser = () => {
  // this hook responsible for cali api to create a user .
  const { mutate, mutateAsync } = useMutation({
    mutationFn: postOneUser,
  });
  return { createUser: mutate, createUserAsync: mutateAsync };
};

export default useCallPostOneUser;
