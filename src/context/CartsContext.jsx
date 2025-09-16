import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getOff } from "../utils";
const CartsContext = createContext({
  carts: [],
  totalPrice: 0,
  addCart: ({ allInfo }) => {},
  removeCart: ({ id }) => {},
});

function CartsContextProvider({ children }) {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isLogin } = useContext(AuthContext);
  // Initial check carts ---- >
  useEffect(() => {
    if (!isLogin) {
      setCarts([]);
      return;
    }
    const cartsFromLocalStorage = JSON.parse(localStorage.getItem("carts"));
    if (cartsFromLocalStorage) {
      setCarts(cartsFromLocalStorage);
    }
  }, [isLogin]);

  const addCart = ({ allInfo }) => {
    setCarts((prev) => [...prev, allInfo]); // to show quickly action for user
    const cartsFromLocalStorage =
      JSON.parse(localStorage.getItem("carts")) || []; // get prev carts
    localStorage.setItem(
      "carts",
      JSON.stringify([...cartsFromLocalStorage, allInfo]) // set new carts
    );
  };
  const removeCart = ({ id }) => {
    const cartsFromLocalStorage =
      JSON.parse(localStorage.getItem("carts")) || []; // get all carts

    const newCarts = cartsFromLocalStorage.filter((item) => {
      return item?._id != id; // remove a item by using its (id) and return new carts
    });

    setCarts(newCarts); // to show result of deleting
    localStorage.setItem("carts", JSON.stringify(newCarts)); // save carts in dynamic way
  };
  useEffect(() => {
    const total = carts?.map((cart) => {
      let off = getOff({ price: cart?.price, off: cart?.discount });
      return cart?.price - off;
    });
    if (total?.length) {
      setTotalPrice(total.reduce((p, n) => p + n));
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  const contextValue = useMemo(() => {
    return {
      addCart,
      removeCart,
      carts,
      totalPrice: totalPrice?.toLocaleString(),
    };
  }, [carts, totalPrice]);

  return (
    <CartsContext.Provider value={contextValue}>
      {children}
    </CartsContext.Provider>
  );
}
export { CartsContext, CartsContextProvider };
