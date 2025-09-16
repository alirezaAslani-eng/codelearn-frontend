

export default function BreadCrumpLoader() {
  return (
    <div className="w-full py-2 sm:py-3 px-2 sm:px-5 rounded-full bg-secondary-light dark:bg-secondary-dark flex items-center gap-x-3 overflow-x-auto hidden-scroll shadow">
      <div className="flex items-center gap-x-2 font-dana-md animate-pulse">
        <div className="py-4 px-6 rounded-full shadow dark:bg-primary-dark"></div>
        <div className="py-4 px-6 rounded-full shadow dark:bg-primary-dark"></div>
        <div className="py-4 px-6 rounded-full shadow dark:bg-primary-dark"></div>
      </div>
    </div>
  );
}
