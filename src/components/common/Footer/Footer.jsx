import { memo } from "react";
// components
import { Title, Img } from "../../Ui/index";
// icon
import {
  HiOutlineLink,
  HiOutlineDeviceMobile,
  HiOutlineMail,
} from "../../Ui/icons/icons";
import { Link } from "react-router-dom";
import { Main } from "../../../routes/clientPath";
// tailwind styles
const bg_primary = "bg-secondary-light dark:bg-secondary-dark w-full ";
const text = "!text-dark dark:!text-light";
const textWithOpacity = "!text-dark/70 dark:!text-light/70";

export default memo(function Footer() {
  return (
    <div className={`${bg_primary} py-5 pb-[60px] lg:pb-0 shadow  `}>
      <div className="container">
        {/* Header ____________>*/}
        <div className="flex justify-between items-center">
          <aside className="flex-1 min-w-0">
            <div className={"flex items-center gap-x-2"}>
              {/* Logo ______________> */}
              <Img
                src="/codelearn-frontend/images/logo.webp"
                className="size-10 sm:size-16"
              />
              <Title
                defaultColor={false}
                level="1"
                className={`${text} text-2xl `}
              >
                کد لرن
              </Title>
            </div>
            {/* Socials ___________> */}
            <div className="mt-5">
              <Socials />
            </div>
          </aside>
          <aside className="flex items-center gap-x-2 self-start">
            <a
              href=""
              className={
                "gold-bg-bg-accent/20 text-bg-accent p-1.5 rounded-lg text-3xl "
              }
            >
              <HiOutlineLink />
            </a>
            <a
              href=""
              className={
                "gold-bg-bg-accent/20 text-bg-accent p-1.5 rounded-lg text-3xl"
              }
            >
              <HiOutlineLink />
            </a>
          </aside>
        </div>
        <span className="w-full h-px bg-primary-dark/30 dark:bg-primary-light/30 my-5"></span>
        {/* Body */}
        <div
          className="
        flex 
        justify-center
        md:justify-between 
        items-center
        md:items-start 
        flex-col
        md:flex-row
        flex-wrap 
        lg:flex-auto 
        gap-6 "
        >
          {/* about us  */}
          <FooterItem title="درباره کد لرن">
            <p>
              شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی،با خیال راحت و
              بدون استرس میتونی از مسیر لذت ببری. ما در کد لرن، توی سفر به دنیای
              برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از نتیجه زحمات مون لذت
              ببریم.
            </p>
          </FooterItem>
          {/* quik access */}
          <div
            className="
          flex 
          justify-center 
          items-center
          3xs:items-start  
          gap-8
          flex-col
          3xs:flex-row
          "
          >
            <FooterItem title="دوره های پرطرفدار">
              <Link>آموزش پایتون</Link>
              <Link>دوره طراحی قالب حرفه ای</Link>
              <Link>آموزش BootStrLinkp</Link>
              <Link>مستر فریلنس</Link>
            </FooterItem>
            <FooterItem title="دسترسی سریع">
              <Link>قوانین و مقررات</Link>
              <Link>ارسال تیکت</Link>
              <Link>همه دوره ها</Link>
            </FooterItem>
          </div>
          {/* Symbol */}
          <div className="size-[150px] flex items-center justify-center font-peyda-md border border-red-500 rounded-full text-2xl">
            نماد اعتماد
          </div>
        </div>
        {/* Footer */}
        <div
          className="
          mt-5
        flex  
        justify-center
        md:justify-between 
        items-center 
        flex-col
        md:flex-row
        gap-y-3
        py-3 
        font-dana-md
        text-center
        "
        >
          <span className={textWithOpacity}>
            کلیه حقوق مادی و معنوی سایت برای{" "}
            <Link href={"/" + Main.root} className="!inline text-bg-accent">
              کد لرن
            </Link>
            {""}
            محفوظ است.
          </span>
          <span className={textWithOpacity}>ساخته شده با ❤️ در کد لرن</span>
        </div>
      </div>
    </div>
  );
});

const Socials = () => {
  return (
    <div
      className={`${textWithOpacity} 
      [&>span>svg]:text-xl
      [&>span]:flex
      [&>span]:items-center 
      [&>span]:gap-x-3  
      [&>span>a]:transition-all   
      font-dana-md 
      flex 
      items-center 
      flex-wrap
      lg:flex-nowrap
      gap-x-5 
      gap-y-3
      `}
    >
      <span className="hover:text-bg-accent">
        <HiOutlineLink />
        <a href="">sabzlearn_support@</a>
      </span>
      <span className="hover:text-bg-accent">
        <HiOutlineDeviceMobile />
        <a href="">02191030926</a>
      </span>
      <span className="hover:text-bg-accent">
        <HiOutlineMail />
        <a href="">info@sabzlearn.ir</a>
      </span>
    </div>
  );
};
const FooterItem = ({ title, children }) => {
  return (
    <div
      className="
     max-w-md 
     [&>a]:text-dark/80
     dark:[&>a]:text-light/80
     [&>a]:font-dana-md
     [&>a]:text-sm
     lg:[&>a]:text-base
     space-y-3
      [&>p]:text-dark/80
       dark:[&>p]:text-light/80
       [&>p]:font-dana-md
      [&>p]:text-sm
      lg:[&>p]:text-base
      text-center
      md:text-right

              "
    >
      <span className={`${text} font-peyda-md text-lg lg:text-2xl`}>
        {title}
      </span>
      {children}
    </div>
  );
};
