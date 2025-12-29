import { Link } from "react-router-dom";
// icon
import {
  HiChevronLeft,
  HiOutlineUserGroup,
  HiUserCircle,
} from "../icons/icons";
// components From Ui
import { Star, DelText, Img, Button } from "../index";
import { imageAddrees } from "../../../constant/SerevrRoute";
import { fromMain, Main } from "../../../routes/clientPath";
const CourseBox = ({
  registers = 2200,
  creator = "",
  shortName = "",
  cover = "default",
  name = "title",
  price = 12_000,
  courseAverageScore = 5,
  discount = 50,
  description = "",
  className = "",
}) => {
  const priceValue = discount == 0 ? price : price - (discount * price) / 100;

  return (
    <div
      className={`flex flex-col justify-between h-full bg-secondary-light dark:bg-secondary-dark shadow rounded-xl overflow-hidden animate-initialShow ${className}`}
    >
      <div>
        {/* Header */}
        <div className="imgBox mb-5 rounded-b-xl transition-all">
          <Link
            to={fromMain(`${Main.course_info}/${shortName}`)}
            className="h-full"
          >
            <Img src={imageAddrees + cover} className="image" loader={true} />
          </Link>
        </div>
        {/* Body */}
        <div className="px-3 mb-2">
          <div className="space-y-1">
            <h1 className="line-clamp-2 break-words dark:text-light font-peyda-md">
              {name}
            </h1>
            <p className="line-clamp-2 text-sm font-dana-md text-dark/60 dark:text-light/60">
              {description}
            </p>
          </div>
          <div
            className={`font-dana-md flex justify-between items-center text-dark dark:text-light mt-2`}
          >
            {/* teacher name */}
            <Link
              className={` flex items-center gap-x-1 font-dana-md hover:text-text-accent dark:hover:text-bg-accent transition-all`}
            >
              <HiUserCircle className="w-6 h-6" />
              <span className="text-xs">{creator}</span>
            </Link>
          </div>
          <div
            className={`font-dana-md flex justify-between items-center text-dark`}
          >
            {/* student count */}
            <div
              className={` flex items-center gap-x-1 font-dana-md dark:text-light`}
            >
              <HiOutlineUserGroup className="w-6 h-6" />
              <span className="text-xs">
                {registers == 0 ? "صفر" : registers}
              </span>
            </div>
            {/* price */}
            <div className="flex flex-col items-end justify-center h-12">
              <span
                className={` flex items-center gap-x-1 font-dana-md text-text-accent dark:text-bg-accent`}
              >
                {priceValue == 0 || !priceValue
                  ? "رایگان"
                  : priceValue.toLocaleString()}
                {priceValue != 0 && priceValue && (
                  <span className="text-xs">تومان</span>
                )}
              </span>
              {discount != 0 && price != 0 && (
                <span
                  className={` flex items-center gap-x-1 font-dana-md text-dark dark:text-light`}
                >
                  <DelText>{price.toLocaleString()}</DelText>
                  <span className="text-xs">تومان</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-3 font-dana-md border-t border-primary-dark/20 dark:border-primary-light/20">
        <div>
          <Star count={courseAverageScore} />
        </div>
        <Button
          to={fromMain(`${Main.course_info}/${shortName}`)}
          className="bg-primary-light dark:bg-primary-dark shadow rounded-lg text-sm !p-2 text-dark dark:text-light"
        >
          مشاهده دوره
          <HiChevronLeft />
        </Button>
      </div>
    </div>
  );
};
export default CourseBox;
