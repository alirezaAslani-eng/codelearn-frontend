

export default function BlogBoxLoader({ count }) {
  const countBox = Array.from({ length: count }, (_, index) => {
    return index;
  });
  return (
    <>
      {count ? (
        countBox.map((box) => {
          return (
            <div
              key={box}
              className="w-full bg-secondary-light shadow dark:bg-secondary-dark p-3 rounded-lg flex justify-between flex-col gap-y-5"
            >
              <div>
                <div className="bg-primary-light dark:bg-primary-dark h-[200px] xs:h-[120px] sm:h-[140px] md:h-[180px] mb-5 rounded-lg animate-pulse"></div>
                <div className="p-3 bg-primary-light dark:bg-primary-dark rounded-lg mb-2 animate-pulse"></div>
                <section className="space-y-1 [&>div]:p-1 [&>div]:rounded-lg [&>div]:bg-primary-light [&>div]:dark:bg-primary-dark animate-pulse">
                  <div className="w-[90%]"></div>
                  <div className="w-[70%]"></div>
                  <div className="w-[50%]"></div>
                </section>
              </div>
              <section className="flex items-center justify-between  [&>div]:bg-primary-light [&>div]:rounded-lg  [&>div]:dark:bg-primary-dark">
                <div className="w-[100px] p-3 animate-pulse"></div>
                <div className="p-5 w-[80px] animate-pulse"></div>
              </section>
            </div>
          );
        })
      ) : (
        <div className="w-full bg-secondary-light shadow dark:bg-secondary-dark p-3 rounded-lg flex justify-between flex-col gap-y-5">
          <div>
            <div className="bg-primary-light dark:bg-primary-dark h-[200px] xs:h-[120px] sm:h-[140px] md:h-[180px] mb-5 rounded-lg animate-pulse"></div>
            <div className="p-3 bg-primary-light dark:bg-primary-dark rounded-lg mb-2 animate-pulse"></div>
            <section className="space-y-1 [&>div]:p-1 [&>div]:rounded-lg [&>div]:bg-primary-light [&>div]:dark:bg-primary-dark animate-pulse">
              <div className="w-[90%]"></div>
              <div className="w-[70%]"></div>
              <div className="w-[50%]"></div>
            </section>
          </div>
          <section className="flex items-center justify-between  [&>div]:bg-primary-light [&>div]:rounded-lg  [&>div]:dark:bg-primary-dark">
            <div className="w-[100px] p-3 animate-pulse"></div>
            <div className="p-5 w-[80px] animate-pulse"></div>
          </section>
        </div>
      )}
    </>
  );
}
