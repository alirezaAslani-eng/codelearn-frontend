import { RouterProvider } from "react-router-dom";
import { routes } from "../routes/routes";
export default function App() {
  return (
    <div id="App" className="min-h-screen">
      <RouterProvider router={routes} />
    </div>
  );
}
