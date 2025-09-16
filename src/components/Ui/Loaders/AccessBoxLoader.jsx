
export default function AccessBoxLoader() {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark shadow rounded-lg p-4">
      {/* Title */}
      <div className="py-2 w-[100px] dark:bg-primary-dark bg-primary-light shadow rounded-xl animate-pulse"></div>
      <div className="mt-6">
        {/* Quick access list */}
        <div className="flex flex-wrap items-center gap-3  dark:divide-light/50 animate-pulse" >
          <div className="bg-primary-light dark:bg-primary-dark shadow px-8 py-4 rounded-full"></div>
          <div className="bg-primary-light dark:bg-primary-dark shadow px-8 py-4 rounded-full"></div>
          <div className="bg-primary-light dark:bg-primary-dark shadow px-8 py-4 rounded-full"></div>
          <div className="bg-primary-light dark:bg-primary-dark shadow px-8 py-4 rounded-full"></div>
          <div className="bg-primary-light dark:bg-primary-dark shadow px-8 py-4 rounded-full"></div>
          <div className="bg-primary-light dark:bg-primary-dark shadow px-8 py-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
