import { queryClient } from "./index";
import queryKeys from "./queryKeys";
// api -- >
import {
  getAllBlogs,
  getAllCategories,
  getAllCourses,
  getAllPopularCourses,
  getAllPreSaleCourses,
  getAllTicketDepartments,
  getLandingInfo,
  getTopBarLies,
} from "../../api";
const setDefaultsQuery = () => {
  queryClient.setQueryDefaults(queryKeys.topBarLies.all, {
    queryFn: getTopBarLies,
    staleTime: 200000, // 2 min
    cacheTime: 500000, // 5 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 3,
  });
  // PRODUCTS ---- >
  // PRODUCTS / course queries >
  queryClient.setQueryDefaults(queryKeys.courses.all, {
    queryFn: getAllCourses,
    queryKey: queryKeys.courses.all,
    staleTime: 30000, // 30 sec
    cacheTime: 300000, // 3 min
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });

  queryClient.setQueryDefaults(queryKeys.popularCourses.all, {
    queryFn: getAllPopularCourses,
    staleTime: 30000, // 30 sec
    cacheTime: 300000, // 3 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });
  queryClient.setQueryDefaults(queryKeys.preSaleCourses.all, {
    queryFn: getAllPreSaleCourses,
    staleTime: 60_000, // 1 min
    cacheTime: 300_000, // 3 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });
  // PRODUCTS / Blog queries >
  queryClient.setQueryDefaults(queryKeys.blogs.all, {
    queryFn: getAllBlogs,
    staleTime: 30000, // 30 sec
    cacheTime: 300000, // 3 min
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });
  // ___
  // Landing Info query -- >
  queryClient.setQueryDefaults(queryKeys.landingInfo.all, {
    queryFn: getLandingInfo,
    staleTime: 5000, // 5 sec
    cacheTime: 300000, // 3 min
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });
  // Categories query -- >
  queryClient.setQueryDefaults(queryKeys.categories.all, {
    queryFn: getAllCategories,
    staleTime: 300000, // 3 min
    cacheTime: 500000, // 5 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });
  queryClient.setQueryDefaults(queryKeys.ticketDepartments.all, {
    queryFn: getAllTicketDepartments,
    staleTime: 300000, // 3 min
    cacheTime: 500000, // 5 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 4,
  });
  queryClient.setQueryDefaults(queryKeys.userOrders.all, {
    cacheTime: 500000, // 5 min    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 2,
  });
  queryClient.setQueryDefaults(queryKeys.tickets.all, {
    staleTime: 5000, // 5 sec
    cacheTime: 500000, // 5 min    refetchOnWindowFocus: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    networkMode: "offlineFirst",
    retry: 2,
  });
};
export default setDefaultsQuery;
