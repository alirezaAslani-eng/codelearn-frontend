function Tag({
  text,
  padding = "8px",
  width = "fit-content",
  height = "fit-content",
}) {
  return (
    <span
      style={{ padding: padding, minWidth: width, minHeight: height }}
      className="
      text-dark 
      dark:text-bg-accent  
      bg-bg-accent 
      dark:bg-primary-dark  
      text-sm 
      font-dana-md w-fit  
      py-1 
      rounded-full 
      flex 
      justify-center 
      items-center"
    >
      {text}
    </span>
  );
}
export default Tag;
