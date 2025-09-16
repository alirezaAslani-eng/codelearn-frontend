import { useContext, useMemo, memo, } from "react";
// components
import {
  Accordion,
  DescriptionWithFade,
  Img,
  SendCommentTextArea,
  SessionBox,
} from "../../Ui";
// icons
import {
  HiQuestionMarkCircle,
  HiOutlinePlay,
  HiOutlineCalendar,
  HiCode,
  HiOutlineArrowCircleLeft,
  HiStar,
} from "../../Ui/icons/icons";
// context -- >
import { CourseInfoContext } from "../../../context/pageContext";
import { getScoreBasedOnComments } from "../../../utils";
import { imageAddrees } from "../../../constant/SerevrRoute";
import { HocSendComment } from "../../sharedLogic/hoc";
import ShowAllComments from "../ShowAllComments/ShowAllComments";
// HOC -- >
const SnedCommentWithLogic = HocSendComment(SendCommentTextArea);
function CourseDetails() {
  // use context to show details .
  const {
    sessions,
    shortName,
    comments,
    cover,
    createdAt,
    updatedAt,
    support,
    status,
    description,
    name,
    isUserRegisteredToThisCourse,
  } = useContext(CourseInfoContext)?.courseInfo;
  // get score value by this method -- >
  const scoreValue = useMemo(() => {
    return getScoreBasedOnComments({ comments });
  }, [comments]);

  return (
    <section className="space-y-3 sm:space-y-6">
      {/* Features >> */}
      <section className="grid grid-cols-2 2xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 ">
        <DetailsBox
          icon={<HiQuestionMarkCircle className="size-5 2xs:size-8" />}
          title={"پشتیبانی"}
          text={support}
        />
        <DetailsBox
          icon={<HiOutlineCalendar className="size-5 2xs:size-8" />}
          title={"انتشار"}
          text={createdAt?.slice(0, 10)}
        />
        <DetailsBox
          icon={<HiOutlinePlay className="size-5 2xs:size-8" />}
          title={"تعداد جلسات"}
          text={sessions?.length == 0 ? "صفر" : sessions?.length}
        />
        <DetailsBox
          icon={<HiCode className="size-5 2xs:size-8" />}
          title={"وضعیت دوره"}
          text={status}
        />
        <DetailsBox
          icon={
            <HiOutlineArrowCircleLeft className="size-5 2xs:size-8 rotate-90" />
          }
          title={"آپدیت دوره"}
          text={updatedAt?.slice(0, 10)}
        />
        <DetailsBox
          icon={<HiStar className="size-5 2xs:size-8 rotate-90" />}
          title={"امتیاز دوره"}
          text={`${scoreValue == 0 ? "صفر" : scoreValue} از 5`}
        />
      </section>
      {/* ProgressBox */}
      <section className="boxContainer space-y-3 sm:space-y-6">
        <Title_Image_Description
          title={name}
          imgSrc={imageAddrees + cover}
          desc={description}
        />
      </section>

      {/* session Accordion */}
      <section className="boxContainer">
        <Accordion title={`تعداد جلسات ${sessions?.length}`}>
          <div className="space-y-3">
            {useMemo(() => {
              if (sessions?.length) {
                return sessions.map((item, index) => {
                  return (
                    <SessionBox
                      key={item?._id}
                      isRegistered={isUserRegisteredToThisCourse}
                      {...{
                        ...item,
                        shortName,
                        sessionNumber: index + 1,
                      }}
                    />
                  );
                });
              } else {
                return (
                  <span className="danger-text font-dana-md text-center">
                    {"هنوز دوره ای ضبط نشده"}
                  </span>
                );
              }
            }, [sessions])}
          </div>
        </Accordion>
      </section>
      {/* Comment section */}
      <div className="boxContainer col-span-full lg:col-span-8 transition-all">
        <SnedCommentWithLogic courseShortName={shortName} />
        {/* Right Side / Comments */}
        <ShowAllComments data={comments} />
      </div>
    </section>
  );
}
export default memo(CourseDetails);

function DetailsBox({ title, text, icon }) {
  return (
    <div className="shadow font-dana-md flex gap-2 justify-between items-center text-dark dark:text-light bg-secondary-light dark:bg-secondary-dark p-3 rounded-lg ">
      {/* Text */}
      <div className="flex flex-col gap-2 justify-center items-start text-dark dark:text-light">
        <span className="text-sm 2xs:text-lg">{title}</span>
        <span className="text-xs 2xs:text-sm">{text}</span>
      </div>
      {/* Icon */}
      <div>{icon}</div>
    </div>
  );
}
const Title_Image_Description = ({ title, imgSrc, desc }) => {
  return (
    <div className="space-y-6">
      <div className=" overflow-hidden rounded-lg">
        <Img
          loader
          loaderClassName="aspect-video rounded-lg"
          className="image"
          src={imgSrc}
        />
      </div>
      <h1 className="text-xl font-peyda-md">{title}</h1>
      <DescriptionWithFade>
        <p className="text-dark dark:text-light font-dana-md ">{desc}</p>
      </DescriptionWithFade>
    </div>
  );
};
