import { TitleWithEffect } from "../Title";
import {
  HiOutlineHome,
  HiCode,
  HiChevronLeft,
  HiOutlineBookOpen,
  HiOutlineUser,
} from "../icons/icons";
import { Link } from "react-router-dom";
import {
  fromMain,
  fromUser,
  Main,
  userPanel,
} from "../../../routes/clientPath";
export default function QuickAccesBox({
  title = "دسترسی سریع",
  isLogin = false,
}) {
  return (
    <div className="text-dark dark:text-light">
      {/* Title */}
      <TitleWithEffect className="!text-base">{title}</TitleWithEffect>
      <div className="text-right mt-6">
        {/* Quick access list */}
        <div className="flex flex-wrap items-center gap-3">
          <AccessButton
            text="صفحه اصلی"
            to={"/" + Main.root}
            icon={<HiOutlineHome  />}
          />
          <AccessButton text="دوره ها" to="/all-courses" icon={<HiCode />} />
          <AccessButton
            text="مقاله ها"
            to={fromMain(Main.blogs)}
            icon={<HiOutlineBookOpen />}
          />
          {isLogin && (
            <AccessButton
              text="پنل من"
              to={fromUser(userPanel.main)}
              icon={<HiOutlineUser />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AccessButton({ icon = <></>, text = "", to = "" }) {
  return (
    <Link to={to} className="block w-fit bg-bg-accent/30 rounded-xl p-2">
      <div className="flex items-center gap-2 hover:text-bg-accent transition-[color] text-sm">
        <span className="flex items-center gap-2">
          {icon}
          {text}
        </span>
        <HiChevronLeft />
      </div>
    </Link>
  );
}
