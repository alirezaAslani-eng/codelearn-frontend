// component -- >
import { BreadCrump, Tag } from "../../components/Ui";
import { SessionsList } from "../../components/sections";
// Context -- >
import { useContext } from "react";
import { SessionInfoContext } from "../../context/pageContext";
import {
  imageAddrees,
  imageAddrees as videoAddress,
} from "../../constant/SerevrRoute";
import { useBreadCrump } from "../../hooks";
import { SessionPrivet, VideoJs } from "../../components/Modules";
import { fromMain, Main } from "../../routes/clientPath";

export default function SessionInfo() {
  const { session, sessionNumber } =
    useContext(SessionInfoContext)?.sessionInfo;
  const { name, shortName, cover } = useContext(SessionInfoContext)?.courseInfo;

  useBreadCrump({
    breadCrumpArray: [
      { link: fromMain(`${Main.course_info}/${shortName}`), text: name },
      {
        link: fromMain(`${Main.session_info}/${shortName}/${session?._id}`),
        text: session?.title,
      },
    ],
  });

  return (
    <SessionPrivet>
      <div className="font-dana-md">
        {/* Header --- > */}
        <section className="mt-3 sm:mt-6 container">
          <BreadCrump />
        </section>

        {/* Video */}
        <section className="container mt-3 sm:mt-6">
          <div className="aspect-video font-dana-md">
            <VideoJs
              src="/codelearn-frontend/images/test.mp4"
              poster={imageAddrees + cover}
            />
          </div>
        </section>

        {/* Body ------ > */}
        <section className="container mt-3 sm:mt-6">
          <div className="grid-cols-12 grid w-full gap-3 sm:gap-6 ">
            {/* Right side  */}
            <aside className="col-span-12 _840:col-span-7 xl:col-span-8 space-y-6">
              {/* Title and session title container */}
              <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-5 accent-after">
                {/* Title  */}
                <div className="mb-6">
                  {/* Course title */}
                  <h1 className="text-dark dark:text-light text-xl">
                    {name ?? ""}
                  </h1>
                </div>
                {/* session title */}
                <div className="flex items-center gap-x-2.5 text-dark dark:text-light pb-3">
                  <Tag text={sessionNumber} />
                  <p>{session?.title}</p>
                </div>
                {/* Buttons section */}
                <div className="text-sm pt-4  border-t border-secondary-dark/20 dark:border-secondary-light/20">
                  {/* <Button className="bg-primary-light dark:bg-primary-dark shadow p-3 rounded-lg">
                  {"سوال دارم!"}
                </Button> */}
                  <a
                    href={videoAddress + session?.video}
                    download
                    className="accent w-fit"
                  >
                    {"دانلود ویدیو"}
                  </a>
                </div>
              </div>
            </aside>

            {/* Left side */}
            <aside className=" col-span-12 _840:col-span-5 xl:col-span-4">
              <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-5">
                <SessionsList />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </SessionPrivet>
  );
}

// i need a title from a courseInfo that related to me
