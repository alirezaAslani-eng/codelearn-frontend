import { memo } from "react";
import { Link } from "react-router-dom";
// coponents From Ui
import { Title, Text, Img } from "../index";
// icons
import { HiOutlineArrowCircleLeft, HiOutlineUserGroup } from "../icons/icons";
import { imageAddrees } from "../../../constant/SerevrRoute";
import { fromMain, Main } from "../../../routes/clientPath";
const defProps = {
  creator: {},
};
export default memo(function BlogBox(props) {
  const {
    shortName = "",
    cover = "",
    title = "Title",
    description = "description",
    creator = defProps.creator,
    createdAt = "date",
  } = props;

  const darkLight = "!text-dark dark:!text-light";
  const darkLightWithOpacity = "!text-dark/50 dark:!text-light/50";
  return (
    // Blog Box
    <div className=" overflow-hidden dark:bg-secondary-dark bg-secondary-light rounded-xl shadow animate-initialShow">
      {/* Header */}
      <div className="imgBox mb-5  overflow-hidden rounded-b-xl w-full">
        <Link
          to={fromMain(`${Main.blog_info}/${shortName}`)}
          className="h-full block"
        >
          <Img loader={true} className="image" src={imageAddrees + cover} />
        </Link>
      </div>
      {/* Body */}
      <div className="px-2 pt-3 space-y-2 h-[168px]">
        {/* Title _________> */}
        <Title className={` text-lg line-clamp-2   ${darkLight}`}>
          {title}
        </Title>
        {/* Description ____________> */}
        <Text
          defaultFontStyle={false}
          className={`line-clamp-3 text-sm font-dana-md  ${darkLightWithOpacity}`}
        >
          {description}
        </Text>
        {/* Teacher's name __________> */}
        <div
          className={` font-dana-md  flex items-center gap-x-1 ${darkLight}`}
        >
          <HiOutlineUserGroup className="text-2xl" />
          <span className="text-sm">{creator.name}</span>
        </div>
      </div>
      <div className="px-3 w-full mt-3 ">
        <span className="w-full h-px bg-primary-dark/40 dark:bg-primary-light/40"></span>
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center px-3 py-5 font-dana-md ">
        {/* Date _________> */}
        <Text defaultFontStyle={false} className={`${darkLightWithOpacity}`}>
          {createdAt.slice(0, 10)}
        </Text>
        <Link
          to={fromMain(`${Main.blog_info}/${shortName}`)}
          className={`${darkLight} flex items-center text-sm gap-x-2 hover:!text-bg-accent dark:hover:!text-bg-accent transition-all `}
        >
          مطالعه مقاله
          <HiOutlineArrowCircleLeft className="size-6" />
        </Link>
      </div>
    </div>
  );
});
