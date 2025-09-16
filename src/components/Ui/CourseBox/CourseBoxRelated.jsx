import { Link } from "react-router-dom";
import Img from "../Img/Img";
import { imageAddrees } from "../../../constant/SerevrRoute";
import { HiChevronLeft } from "../icons/icons";
import { fromMain, Main } from "../../../routes/clientPath";

function CourseBoxRelated(props) {
  const { cover = "", description = "", name = "", shortName = "" } = props;
  return (
    <div className="p-2 rounded-xl shadow bg-primary-light dark:bg-primary-dark animate-initialShow will-change-transform">
      <div className="flex items-center gap-x-3">
        {/* Image  */}
        <aside className="shrink-0 h-[60px]">
          <Img
            className="aspect-video h-full rounded-xl"
            loader
            src={imageAddrees + cover}
          />
        </aside>
        <aside className="flex items-center justify-between flex-1 min-w-0">
          <div className="flex justify-between flex-col">
            <Link to={fromMain(`${Main.course_info}/${shortName}`)}>
              <h1 className="line-clamp-2 text-xs xs:text-sm break-words">
                {name}
              </h1>
            </Link>
            {/* Description */}
            <p className="line-clamp-1 text-xs xs:text-sm text-dark/70 dark:text-light/70">
              {description}
            </p>
          </div>
          <div>
            <Link
              className="text-xs"
              to={fromMain(`${Main.course_info}/${shortName}}`)}
            >
              <HiChevronLeft />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CourseBoxRelated;
