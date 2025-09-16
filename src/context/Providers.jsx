import { ModalProvider } from "react-modal-hook";
import {
  AuthProvider,
  BreadCrumpProvider,
  CartsContextProvider,
  ShowErrorProvider,
  ToggleActionProvider,
} from "./index";
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
              <ShowErrorProvider>{children}</ShowErrorProvider>
            </ModalProvider>
          </ToggleActionProvider>
        </CartsContextProvider>
      </BreadCrumpProvider>
    </AuthProvider>
  );
}
export { GlobalProvider };
