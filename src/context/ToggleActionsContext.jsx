import { createContext, useCallback, useState } from "react";
const ToggleActionsContext = createContext({
  isOpenUserSideBar: false,
  isOpenGlobalSideBar: false,
  isChatBoxOpen: false,
  chatBoxHandler: () => {},
  userSideBarHandler: () => {},
  globalSideBarHandler: () => {},
});

function ToggleActionProvider(props) {
  const { children } = props;
  const [isOpenUserSideBar, setIsOpenUserSideBar] = useState(false);
  const [isOpenGlobalSideBar, setIsOpenGlobalSideBar] = useState(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
   // Global SideBar HAndler --- >
  const globalSideBarHandler = useCallback(
    (bol) => setIsOpenGlobalSideBar(bol),
    []
  );
  // Side Bar at user panel HAndler --- >
  const userSideBarHandler = useCallback(
    (bol) => setIsOpenUserSideBar(bol),
    []
  );
  // Chat Box HAndler --- >
  const chatBoxHandler = useCallback((bol) => setIsChatBoxOpen(bol), []);
  const contextValue = {
    isOpenUserSideBar,
    isOpenGlobalSideBar,
    isChatBoxOpen,
    chatBoxHandler,
    globalSideBarHandler,
    userSideBarHandler,
  };

  return (
    <ToggleActionsContext.Provider value={contextValue}>
      {children}
    </ToggleActionsContext.Provider>
  );
}
export { ToggleActionProvider, ToggleActionsContext };
