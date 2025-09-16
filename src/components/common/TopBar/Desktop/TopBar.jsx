import { Link } from "react-router-dom";
// components
import { Logo } from "../../../Ui";
// hook
import MenuList from "./MenuList";
import LeftAside from "./LeftAside";
import { GetDataInjector } from "../../../sharedLogic/injectors";
import queryKeys from "../../../../libs/reactQuery/queryKeys";

export default function TopBar() {
  return (
    <>
      <header className="font-dana-md bg-secondary-light dark:bg-secondary-dark sticky inset-0 z-10 hidden _840:block w-full">
        <div className="container flex justify-between items-center py-2">
          <aside className="flex items-center gap-x-4 text-dark dark:text-light">
            {/* right-Aside / Logo */}
            <Logo className="size-14" />
            {/* right-Aside / nav-menu */}
            <ul className="flex items-center gap-x-4">
              <GetDataInjector
                Component={MenuList}
                queryKey={queryKeys.topBarLies.all}
              />
            </ul>
          </aside>

          {/* left-Aside >> */}
          <aside className="font-dana-md flex items-center gap-x-4 text-dark dark:text-light">
            <LeftAside />
          </aside>
        </div>
      </header>
    </>
  );
}
