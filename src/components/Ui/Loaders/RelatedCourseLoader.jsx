
export default function RelatedCourseLoader({ count }) {
  const ar = Array.from({ length: count }, (_, index) => {
    return index;
  });
  return (
    <>
      {count ? (
        ar.map((_, index) => {
          return (
            <div
              key={index}
              className="p-2 rounded-xl shadow bg-primary-light dark:bg-primary-dark animate-pulse"
            >
              <div className="flex items-center gap-x-3">
                {/* Image Laoder */}
                <aside className="w-[100px] h-[60px] shadow bg-secondary-light dark:bg-secondary-dark rounded-xl"></aside>
                <aside className="flex items-center gap-x-3 flex-1">
                  <div className="flex flex-col gap-y-3 h-full flex-1">
                    {/* Title loader */}
                    <div className="dark:bg-secondary-dark bg-secondary-light p-2 rounded-full w-full shadow"></div>
                    {/* TExt loader */}
                    <div className="dark:bg-secondary-dark/70 bg-secondary-light/70 p-1 rounded-full w-[60%] shadow"></div>
                  </div>
                  <div>
                    {/* Button loader */}
                    <div className="dark:bg-secondary-dark bg-secondary-light p-5 rounded-xl shadow"></div>
                  </div>
                </aside>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center gap-x-3">
          {/* Image Laoder */}
          <aside className="w-[100px] h-[60px] shadow bg-secondary-light dark:bg-secondary-dark rounded-xl"></aside>
          <aside className="flex items-center gap-x-3 flex-1">
            <div className="flex flex-col gap-y-3 h-full flex-1">
              {/* Title loader */}
              <div className="dark:bg-secondary-dark bg-secondary-light p-2 rounded-full w-full shadow"></div>
              {/* TExt loader */}
              <div className="dark:bg-secondary-dark/70 bg-secondary-light/70 p-1 rounded-full w-[60%] shadow"></div>
            </div>
            <div>
              {/* Button loader */}
              <div className="dark:bg-secondary-dark bg-secondary-light p-5 rounded-xl shadow"></div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
