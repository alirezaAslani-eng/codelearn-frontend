import ReactDOM from "react-dom/client";
//_____Qery_Client__________
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/reactQuery";
import { setDefaultQuery } from "./libs/reactQuery";
// ____________ Modal context ____
// ____________ App's Provider ____
import { GlobalProvider } from "./context/Providers";
//___App___
import App from "./container/App";
// css
import "./css/output.css";
import "./css/custom.css";
setDefaultQuery();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React Query
  <QueryClientProvider client={queryClient}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </QueryClientProvider>
);
