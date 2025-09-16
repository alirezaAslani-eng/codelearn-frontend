import { HiChevronLeft } from "../icons/icons";
export default function NavigateButton({ onClick, right, className }) {
  const runAction = () => {
    onClick && onClick();
  };
  return (
    <button
      onClick={runAction}
      className={`bg-bg-accent text-dark p-3 rounded-full ${className}`}
    >
      {!right ? <HiChevronLeft /> : <HiChevronLeft className="rotate-180" />}
    </button>
  );
}
