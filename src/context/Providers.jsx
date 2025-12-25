import { ModalProvider } from "react-modal-hook";
import {
  AuthProvider,
  BreadCrumpProvider,
  CartsContextProvider,
  ShowErrorProvider,
  ToggleActionProvider,
} from "./index";
import { ScrollStateProvider } from "./react-scroll";
// global provider
function GlobalProvider({ children }) {
  return (
    <AuthProvider>
      <BreadCrumpProvider>
        {/* Cart Provider */}
        <CartsContextProvider>
          {/* Toggle Action Provider */}
          <ToggleActionProvider>
            {/* Modal Provider */}
            <ModalProvider>
              {/* Show Errors Provider */}
              <ShowErrorProvider>
                <ScrollStateProvider>{children}</ScrollStateProvider>
              </ShowErrorProvider>
            </ModalProvider>
          </ToggleActionProvider>
        </CartsContextProvider>
      </BreadCrumpProvider>
    </AuthProvider>
  );
}
export { GlobalProvider };
