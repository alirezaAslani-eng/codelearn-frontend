import { Link } from "react-router-dom";
import { memo } from "react";
// components
import { TitleWithEffect } from "../index";
// icons
import { HiOutlineArrowCircleLeft } from "../icons/icons";

const HeaderSection = ({
  mainTitle = "Main title",
  subTitle = "",
  link = "",
  linkText,
  children,
  disabledLink = false,
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      <TitleWithEffect secondText={subTitle}>{mainTitle}</TitleWithEffect>
      {!linkText ? (
        children
      ) : !disabledLink ? (
        <Link
          to={link}
          className="text-text-accent dark:text-bg-accent link text-xs sm:text-base"
        >
          {linkText}
          <HiOutlineArrowCircleLeft />
        </Link>
      ) : (
        <button
          className="text-text-accent dark:text-bg-accent link text-xs sm:text-base"
          disabled={true}
        >
          {linkText}
          <HiOutlineArrowCircleLeft />
        </button>
      )}
    </div>
  );
};

export default memo(HeaderSection);
