import { createContext } from "react";
const CourseInfoContext = createContext({
  courseInfo: {
    _id: "",
    name: "",
    description: "",
    cover: "",
    support: "",
    shortName: "",
    price: 0,
    isComplete: 0,
    status: "start",
    discount: 0,
    categoryID: {
      _id: "",
      title: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      name: "",
    },
    creator: {
      _id: "",
      username: "",
      email: "",
      name: "",
      role: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      profile: "",
      phone: "",
    },
    createdAt: "",
    updatedAt: "",
    __v: 0,
    courseStudentsCount: 0,
    sessions: [],
    comments: [],
    isUserRegisteredToThisCourse: false,
  },
});

export { CourseInfoContext };
