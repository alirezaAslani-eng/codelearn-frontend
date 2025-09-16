

export default function Badge({ children }) {
  return (
    <span className="flex justify-center items-center text-sm rounded-full bg-bg-accent text-dark absolute -top-2 -right-2 w-5 h-5">
      {children}
    </span>
  );
}
