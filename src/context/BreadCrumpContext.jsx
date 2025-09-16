import { createContext, useState } from "react";
const BreadCrumpContext = createContext({
  setBreadCrumpAddress: (
    addressArray = [
      { link: "", text: "" },
      { link: "", text: "" },
      { link: "", text: "" },
    ]
  ) => {},
  breadCrumpAddress: [{ link: "", text: "", id: "" }],
});

const BreadCrumpProvider = ({ children }) => {
  const [breadCrumpAddress, setBreadCrumpAddress] = useState([]);
  return (
    <BreadCrumpContext.Provider
      value={{ setBreadCrumpAddress, breadCrumpAddress }}
    >
      {children}
    </BreadCrumpContext.Provider>
  );
};

export { BreadCrumpContext, BreadCrumpProvider };
