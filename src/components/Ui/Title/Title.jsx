
export default  function Title({
  
  fontFamily = "peyda-md",
  level = "6",
  children = "",
  className = "",
  defaultColor = true,
}) {
  const style = {
    fontFamily: fontFamily,
  };
  const TitleLevel = `h${level}`;
  return (
    <TitleLevel
      className={`${className} ${defaultColor && "text-light"}`}
      style={style}
    >
      {children}
    </TitleLevel>
  );
}
