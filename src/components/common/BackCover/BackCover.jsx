export default function BackCover({ zIndex = 9, className, onClick }) {
  const clickHandler = (e) => {
    e.stopPropagation()
    onClick && onClick()
  }
  return (
    <div
      onClick={clickHandler}
      className={` w-full h-screen fixed top-0 left-0  ${className}`}
      style={{ zIndex: zIndex }}
    ></div>
  );
}
