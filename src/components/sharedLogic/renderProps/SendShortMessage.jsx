import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { getAllTickets, getOneTicket, postOneTicket } from "../../../api";
import { queryKeys } from "../../../libs/reactQuery";
import { AuthContext } from "../../../context";
function SendShortMessage({ render }) {
  const [message, setMessage] = useState(""); // user message
  const {
    userToken,
    isLogin,
    isPending: userLoading,
  } = useContext(AuthContext);
  // get all tickets -- >
  const {
    data: tickets,
    isLoading: getAllTicketsLoading,
    refetch: RefectchAllTickets,
  } = useQuery({
    retry: false,
    queryKey: [...queryKeys.tickets.all, userToken],
    queryFn: () => {
      return getAllTickets({
        headers: { Authorization: `Bearer ${userToken}` },
      });
    },
  });
  // Get Answer ticket Based on tickets?.[0]?._id (this is complex process Beacuse of server side paterns) -- >
  const {
    data: oneTicket,
    isLoading: oneTicketLaoding,
    refetch: RefetchOneTicket,
  } = useQuery({
    retry: false,
    queryKey: queryKeys.tickets.one(`${tickets?.[0]?._id},${userToken}`),
    queryFn: () => {
      return getOneTicket({
        param: tickets?.[0]?._id,
        headers: { Authorization: `Bearer ${userToken}` },
      });
    },
  });
  // update messages when user login or out --->
  const updateWhenAuth = async () => {
    await RefectchAllTickets();
    RefetchOneTicket();
  };
  useEffect(() => {
    if (userLoading) return;
    updateWhenAuth();
  }, [isLogin, userLoading]);
  // Send Message Logic -- >
  const {
    mutate: sendMessage,
    isPending: sending,
    isError: sendingError,
  } = useMutation({
    mutationFn: postOneTicket,
  });
  // when user send a message -- >
  useEffect(() => {
    // avoid sending repeat text
    if (!message?.trim()) return;
    sendMessage(
      {
        body: {
          departmentID: "63b68879f1d06a5090090f60",
          departmentSubID: "63b688d0e1286a126a8f2ff0",
          body: message,
          priority: "2",
          title: "پیام از سمت صفحه اصلی",
        },
        headers: { Authorization: `Bearer ${userToken}` },
      },
      {
        onSuccess: async () => {
          await RefectchAllTickets();
          RefetchOneTicket();
        },
      }
    );
  }, [message]);

  return render({
    // Get message -- >
    message: oneTicket?.ticket || null, // show first message
    answer: oneTicket?.answer || null, // show first message
    GetMessageLoading: getAllTicketsLoading
      ? getAllTicketsLoading
      : oneTicketLaoding, // loading state of get first message
    // Send Message -- >
    sending, // when user click on send button this value handle true and false of loading state
    sendingError, // when sending process encounter Error
    setMessage,
  });
}

export default memo(SendShortMessage);
