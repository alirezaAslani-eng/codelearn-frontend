import { postContactMessage } from "../../../api";
import { useMutation } from "@tanstack/react-query";
const useCallPostContactMessage = () => {
  // this hook responsible for cali api to create a user .
  const { mutate, mutateAsync } = useMutation({
    mutationFn: postContactMessage,
  });
  return { contactMessage: mutate, contactMessageAsync: mutateAsync };
};

export default useCallPostContactMessage;
