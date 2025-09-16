import {
  RelatedCourseLoader,
  AccessBoxLoader,
  BreadCrumpLoader,
  TextLoader,
} from "../index";

export default function BlogInfoLoader() {
  return (
    <div className="container">
      <section className="mt-3 sm:mt-6">
        <BreadCrumpLoader />
      </section>
      <section className="mt-3 sm:mt-6">
        <div className="grid grid-cols-12 gap-3 sm:gap-6">
          <aside className="col-span-12 lg:col-span-8 bg-secondary-light dark:bg-secondary-dark shadow rounded-lg min-h-[500px] p-3">
            <div className="w-1/2 my-3">
              <TextLoader
                lineCounte={1}
                className="!bg-primary-light dark:!bg-primary-dark"
              />
            </div>
            <div className="bg-primary-light dark:bg-primary-dark shadow rounded-lg aspect-video animate-pulse"></div>
            <div className="mt-3">
              <TextLoader
                lineCounte={5}
                className="!bg-primary-light dark:!bg-primary-dark"
              />
            </div>
          </aside>
          <aside className="col-span-12 lg:col-span-4 space-y-3 sm:space-y-6 ">
            <AccessBoxLoader />
            <div className="bg-secondary-light dark:bg-secondary-dark shadow rounded-lg p-4 space-y-3">
              <RelatedCourseLoader count={5} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
