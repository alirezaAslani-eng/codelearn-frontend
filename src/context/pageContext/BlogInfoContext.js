import { createContext } from "react";
const BlogInfoContext = createContext({
  blogInfo: {
    _id: "",
    title: "",
    description: "",
    body: "",
    cover: "",
    shortName: "",
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
    publish: 0,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
});

export { BlogInfoContext };
