const queryKeys = {
  userInfo: {
    all: ["UserInfo"],
  },
  topBarLies: {
    all: ["topBarLies"],
  },
  landingInfo: {
    all: ["landingInfo"],
  },
  courses: {
    all: ["courses"],
    one: (param) => ["course-info", param],
    basedOnCategory: (param) => ["course-category", param],
    related: (param) => ["courses-related", param],
  },
  sessions: {
    one: (oneId) => ["sessions", oneId],
  },
  popularCourses: {
    all: ["popularCourses"],
  },
  preSaleCourses: {
    all: ["preSaleCourses"],
  },
  categories: {
    all: ["categories"],
  },
  blogs: {
    all: ["blogs"],
    one: (oneId) => ["blog-info", oneId],
  },
  globalSearch: {
    one: (value) => ["globalSearch", value],
  },
  userOrders: {
    all: ["userOrders"],
  },
  tickets: {
    all: ["tickets"],
    one: (param) => ["ticket-info", param],
  },
  ticketDepartments: {
    all: ["ticketDepartments"],
    subDepartMents: (param) => ["subDepartMents", param],
  },
};
export default queryKeys;
