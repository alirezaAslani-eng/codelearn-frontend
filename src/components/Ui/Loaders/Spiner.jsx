

export default function Spiner({
  text = "در حال برگزاری تیکت های اخیر شما",
  className = "",
  textClassName = "",
}) {
  return (
    <div
      className={` text-dark/80 dark:text-light/80 font-dana-md ${textClassName}`}
    >
      {text}
    </div>
  );
}
