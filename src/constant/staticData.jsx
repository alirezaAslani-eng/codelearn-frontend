import {
  HiOutlineHome,
  HiCode,
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineChatAlt2,
  HiQuestionMarkCircle,
  HiOutlineArrowCircleLeft,
  HiOutlinePlay
} from "../components/Ui/icons/icons";
import { fromUser, userPanel } from "../routes/clientPath";

const getUserShortMenu = () => {
  return [
    {
      text: "پیشخوان",
      link: fromUser(userPanel.main),
      icon: <HiOutlineHome />,
      arrowIcon: <HiOutlineHome />,
    },
    {
      text: "تیکت های من",
      link: fromUser(userPanel.tickets),
      icon: <HiQuestionMarkCircle />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "دوره های من",
      link: fromUser(userPanel.my_courses),
      icon: <HiOutlinePlay />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "سفارش های من",
      link: fromUser(userPanel.odrers),
      icon: <HiOutlineBookOpen />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
  ];
};

const getUserPanelNavigations = () => {
  return [
    {
      text: "پیشخوان",
      link: fromUser(userPanel.main),
      linkIcon: <HiOutlineHome className="w-6 h-6" />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "دوره های من",
      link: fromUser(userPanel.my_courses),
      linkIcon: <HiCode className="w-6 h-6" />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "ارسال تیکت",
      link: fromUser(userPanel.new_ticket),
      linkIcon: <HiOutlineChatAlt2 className="w-6 h-6" />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "تیکت های من",
      link: fromUser(userPanel.tickets),
      linkIcon: <HiQuestionMarkCircle className="w-6 h-6" />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "سفارش های من",
      link: fromUser(userPanel.odrers),
      linkIcon: <HiOutlineBookOpen className="w-6 h-6" />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
    {
      text: "اطلاعات حساب",
      link: fromUser(userPanel.user_details),
      linkIcon: <HiOutlineUser className="w-6 h-6" />,
      arrowIcon: <HiOutlineArrowCircleLeft />,
    },
  ];
};

export { getUserPanelNavigations, getUserShortMenu };
