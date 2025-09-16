

export default function DelText({ children }) {
  return (
    <div className="relative opacity-80 w-fit">
      <span className="absolute w-full h-px bg-dark/80 dark:bg-light/80 top-2/4 "></span>
      {children}
    </div>
  );
}
