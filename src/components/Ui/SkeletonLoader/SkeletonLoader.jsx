
export default function SkeletonLoader() {
  return (
    <>
      <div
        role="status"
        className="flex items-center justify-center flex-col h-56  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 space-y-4 p-4"
      >
        <div className="w-full h-[50%] bg-gray-400 dark:bg-gray-800 shadow rounded-lg"></div>
        <div className="w-[80%] h-10 bg-gray-400 self-start dark:bg-gray-800 shadow rounded-lg"></div>
        <div className="w-[50%] h-10 bg-gray-400 self-start dark:bg-gray-800 shadow rounded-lg"></div>
      </div>
    </>
  );
}
