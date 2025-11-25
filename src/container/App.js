import { RouterProvider } from "react-router-dom";
import { routes } from "../routes/routes";
import { initialSetTheme } from "../utils";
import { useEffect } from "react";

export default function App() {
  // dark light theme -- >
  initialSetTheme();
  useEffect(() => {
    alert("Please turn on your vpn !!");
  }, []);
  return (
    <div id="App" className="min-h-screen">
      <RouterProvider router={routes} />
    </div>
  );
}
