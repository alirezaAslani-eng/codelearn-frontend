import { Button } from "../Buttons";
const defprops = {
  userMenuLinks: [],
  onLogout: () => {},
};
export default function UserShortMenu({
  userMenuLinks = defprops.userMenuLinks,
  userName = "",
  courseCount = 0,
  onLogout = defprops.onLogout,
  isAdmin = false,
  adminRoute = "",
}) {
  const onLogoutCaller = () => {
    try {
      onLogout();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <section className="flex items-center gap-x-2 h-[64px]">
          <div className="w-[56px] h-[56px] rounded-full font-sans flex items-center justify-center bg-primary-light dark:bg-primary-dark shadow overflow-hidden uppercase">
            {userName?.slice(0, 1) || "P"}
          </div>
          <div className="flex flex-col justify-between ">
            <div className="line-clamp-1">{userName}</div>
            <div>دوره های شما : {courseCount}</div>
          </div>
        </section>
        <section>
          <div className="border-b border-t border-secondary-dark/20 dark:border-secondary-light/20 py-4 my-4">
            {userMenuLinks.map((item, index) => {
              return (
                <Button
                  to={item.link}
                  key={index}
                  className="hover:bg-bg-accent/40 rounded-lg p-2 w-full !justify-start transition-all"
                >
                  <div className="[&>svg]:!min-w-[24px] [&>svg]:!min-h-[24px]">
                    {item?.icon}
                  </div>
                  {item?.text}
                </Button>
              );
            })}
          </div>
          <div className="flex items-center gap-x-3 text-sm">
            <Button
              onClick={onLogoutCaller}
              className="danger-btn flex-1 min-w-0"
            >
              خروج از حساب
            </Button>
            {isAdmin && (
              <Button to={adminRoute} className="success-btn">
                ورود به پنل
              </Button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
