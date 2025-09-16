
export default function Text({ children, defaultFontStyle = true, dark = true, className = "" }) {
  return (
    <p
      className={`${className} ${!dark ? "text-light" : "text-dark"} ${defaultFontStyle && "font-dana-md text-lg lg:text-xl"
        }`}
    >
      {children}
    </p>
  );
}
