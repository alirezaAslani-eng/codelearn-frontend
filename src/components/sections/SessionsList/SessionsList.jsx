import { useContext } from "react";
import { SessionBox } from "../../Ui";
import { HiOutlineBookOpen } from "../../Ui/icons/icons";
import { SessionInfoContext } from "../../../context/pageContext";
export default function SessionsList() {
  const { sessions, shortName } = {
    ...useContext(SessionInfoContext)?.sessionInfo,
    ...useContext(SessionInfoContext)?.courseInfo,
  };

  return (
    <div className="w-full">
      <div className="text-dark dark:text-light flex items-center gap-x-2 pb-5 mb-5 border-b dark:border-secondary-light/50 border-secondary-dark/50">
        <HiOutlineBookOpen className="w-[30px] h-[30px]" />
        <span className="block ">{"سرفصل های دوره"}</span>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        <div className="space-y-5">
          {sessions?.map((item, index) => {
            return (
              <div key={item?._id}>
                <SessionBox
                  {...item}
                  shortName={shortName}
                  sessionNumber={index + 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
