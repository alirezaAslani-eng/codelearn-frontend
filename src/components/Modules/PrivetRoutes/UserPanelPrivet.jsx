import { useContext } from "react";
import { AuthContext } from "../../../context";
import { LoadeingErrorHandler } from "../index";
import { Navigate } from "react-router-dom";
import { UserPanelPageLoader } from "../../Ui";
import {  Main } from "../../../routes/clientPath";

export default function UserPanelPrivet({ children }) {
  const { isLogin, isPending: userLoading } = useContext(AuthContext);

  return (
    <LoadeingErrorHandler
      isLoading={{
        check: userLoading,
        loading: <UserPanelPageLoader />,
      }}
    >
      {isLogin ? children : <Navigate to={"/" + Main.root} />}
    </LoadeingErrorHandler>
  );
}
