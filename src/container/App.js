import { RouterProvider } from "react-router-dom";
import { routes } from "../routes/routes";
import { initialSetTheme } from "../utils";
export default function App() {
  // dark light theme -- >
  initialSetTheme();
  return (
    <div id="App" className="min-h-screen">
      <RouterProvider router={routes} />
    </div>
  );
}
