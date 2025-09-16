const Main = {
  // ROOT main !!!
  root: "main",
  // main/ --- >
  // Form Section --- >
  register: "register",
  login: "login",
  contact: "contact",

  // Products Section --- >
  category: "category", //:categoryName
  courses: "all-courses",
  course_info: "course-info", //:courseName
  session_info: "session-info", //:courseShortName/:sessionId
  blogs: "all-blogs",
  blog_info: "blog-info", //:blogName
  buy_course: "buy-course",

  // Fanctional Page  --- >
  globalSearch: "search", //:searchValue
  chat: "chat",
};
const userPanel = {
  root: "user", //*
  main: "main",
  user_carts: "user-carts",
  user_details: "user-details",
  new_ticket: "new-ticket",
  ticket_status: "ticket-status",
  tickets: "tickets",
  odrers: "orders",
  my_courses: "my-courses",
};

// root/your-path --> for example it can return this "main/register"
const fromMain = (path) => {
  return `/${Main.root}/${path}`;
};
const fromUser = (path) => {
  return `/${userPanel.root}/${path}`;
};

export { Main, userPanel, fromMain, fromUser };
