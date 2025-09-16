import Spiner from "./Spiner";

export default function UserPanelPageLoader() {
  return (
    <div className="bg-primary-light dark:bg-primary-dark h-screen w-full">
      <div className="abs-center">
        <Spiner text="کمی صبر کنید" />
      </div>
    </div>
  );
}
