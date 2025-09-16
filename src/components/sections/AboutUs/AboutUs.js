import { memo } from "react";
import {
  HiCode,
  HiOutlineUserGroup,
  HiQuestionMarkCircle,
  HiOutlineBookOpen,
} from "../../Ui/icons/icons";
// components From UI folder
import { Title, Text } from "../../Ui";

const AboutUs = memo(() => {
  const iconStyle =
    "text-bg-accent min-w-[30px] min-h-[30px] _840:min-w-[40px] _840:min-h-[40px]";
  return (
    <>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 ">
          <AboutBox
            icon={<HiCode className={iconStyle} />}
            title=" دوره های تخصصی"
            subTitle=" با پشتیبانی و کیفیت بالا در اختیار شما هست"
          />

          <AboutBox
            icon={<HiOutlineUserGroup className={iconStyle} />}
            title="مدرس های ما"
            subTitle="ما فقط اصول کار را یاد نمیدیم بلکه شما را برای بازار واقعی آماده میکنیم"
          />

          <AboutBox
            icon={<HiQuestionMarkCircle className={iconStyle} />}
            title="پشتیبانی ما"
            subTitle="بعد از 10 سال هم کی بیای بازم جواب سوالت را میدیم و کمکت میکنیم"
          />

          <AboutBox
            icon={<HiOutlineBookOpen className={iconStyle} />}
            title="مقاله های کد لرن"
            subTitle="فقط بخوان و از تجربه های توسعه دهندگان حرفه ای ما استفاده کن"
          />
        </div>
      </div>
    </>
  );
});

const AboutBox = ({ title, icon, subTitle }) => {
  return (
    <div className="p-3 rounded-lg h-[104px] flex items-center gap-x-2 bg-secondary-light dark:bg-secondary-dark  shadow ">
      {icon}
      <div>
        <Title
          defaultColor={false}
          className="!text-xl  text-dark dark:text-light"
        >
          {title}
        </Title>
        <Text
          defaultFontStyle={false}
          className="font-dana-md dark:text-light/70 line-clamp-2 !text-sm "
        >
          {subTitle}
        </Text>
      </div>
    </div>
  );
};

export default AboutUs;
