
export default function Profile({
  children,
  className = "w-[88px] h-[88px] p-1.5 bg-secondary-dark/30 dark:bg-secondary-light/30",
}) {
  return (
    <>
      <div className={` rounded-full ${className}`}>
        <div className="w-full h-full bg-red-50 rounded-full">{children}</div>
      </div>
    </>
  );
}
