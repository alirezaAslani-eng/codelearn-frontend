import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {HiOutlineSearch} from "../icons/icons"
const defProps = {
  onChange: () => {},
  onSubmit: () => {},
  onClose: () => {},
};
function SerachBoxHeader({
  placeholder = "جستجو دوره",
  closeWhenSubmit = true,
  closeWhenNavigate = true,
  onChange = defProps.onChange,
  onSubmit = defProps.onSubmit,
  onClose = defProps.onClose, // if you use it in a modal
  className = "",
  btnClassName = "",
  inputClassName = "",
  value = "",
  to = "",
  autoFocus = true,
}) {
  const [internalValue, setInternalValue] = useState("");
  const nav = useNavigate();
  const onChangeHandler = (e) => {
    if (!value) setInternalValue(e.target.value);
    try {
      onChange(e.target.value);
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (to) {
      nav(to);
      closeWhenNavigate && onClose();
    } else {
      try {
        onSubmit(internalValue);
        closeWhenSubmit && onClose();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-full">
        <div
          className={`      
            flex    
          pl-3
          items-center      
          overflow-hidden 
          w-full
          h-full
          bg-primary-light
          dark:bg-primary-dark 
          rounded-xl 
          border 
          text-dark/90 
          border-bg-accent/20 shadow 
          dark:text-light/90 
          placeholder-dark/70 
          dark:placeholder-light/70
          ${className}`}
        >
          <input
            autoFocus={autoFocus}
            value={value ? value : internalValue}
            onChange={onChangeHandler}
            placeholder={placeholder}
            type="text"
            className={`p-3 bg-transparent text-sm flex-1 min-w-0 h-full outline-none ${inputClassName}`}
          />

          <button type="submit" className={btnClassName}>
            <HiOutlineSearch />
          </button>
        </div>
      </form>
    </>
  );
}
export default SerachBoxHeader;
