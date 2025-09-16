import { Button } from "../Buttons";
import { HiOutlinePlay } from "../icons/icons";
import { Link } from "react-router-dom";
import { imageAddrees } from "../../../constant/SerevrRoute";
import { fromMain, Main } from "../../../routes/clientPath";
const defProp = {
  info: {},
};
export default function CourseBoxUserPanel(props) {
  return (
    <div
      className="
    flex 
    flex-col 
    font-dana-md 
    text-dark 
    dark:text-light 
    bg-secondary-light 
    dark:bg-secondary-dark 
    shadow 
    animate-initialShow  
    will-change-transform"
    >
      <Link
        to={fromMain(`${Main.course_info}/${props?.shortName}}`)}
        className="relative block"
      >
        <HiOutlinePlay className="abs-center w-20 h-20 text-secondary-light/70 hover:text-bg-accent hover:scale-[0.95] transition-all" />
        <img
          className="aspect-video"
          src={`${imageAddrees}${props?.cover || ""}`}
        />
      </Link>
      <section className="p-3 flex-1 flex flex-col justify-between gap-y-3">
        <div className="space-y-3 ">
          {/* Title */}
          <div>
            <p className="line-clamp-2 text-sm _840:text-base break-words">
              {props?.name}
            </p>
          </div>
          {/* Description */}
          <div className=" text-dark/80 dark:text-light/80">
            <p className="line-clamp-2 text-xs _840:text-sm">
              {props?.description}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            to={fromMain(`${Main.course_info}/${props?.shortName}}`)}
            className="accent-outline text-sm"
          >
            مشاهده
          </Button>
        </div>
      </section>
    </div>
  );
}
