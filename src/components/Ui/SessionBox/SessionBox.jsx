import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import { HiOutlinePlay } from "../icons/icons";
import { AuthContext } from "../../../context";
import { useContext } from "react";
import { fromMain, Main } from "../../../routes/clientPath";

function SessionBox(props) {
  const { isLogin } = useContext(AuthContext);
  return (
    <>
      {isLogin ? (
        // Login State -- >
        props?.isRegistered ? (
          <AccessBox {...props} />
        ) : props?.free ? (
          <AccessBox {...props} />
        ) : (
          <NotAccessBox {...props} isLogin={isLogin} />
        )
      ) : (
        // Logout State -- >
        <NotAccessBox isLogin={isLogin} {...props} />
      )}
    </>
  );
}
export default SessionBox;

function NotAccessBox(props) {
  const { isLogin = false, title = "", time, sessionNumber } = props;
  return (
    <div className="bg-bg-accent/20 p-2 rounded-lg">
      <div
        className="
      flex
      justify-between 
      items-center 
      gap-x-2
      text-dark 
      dark:text-light 
      font-dana-md
      text-xs
      md:text-base
      "
      >
        <aside className="flex items-center gap-x-3">
          <Tag width="30px" height="30px" padding="0" text={sessionNumber} />
          <span className="danger-text text-nowrap">{"قفل"}</span>
          <p className=" text-sm">{title}</p>
        </aside>
        <aside>
          <span>{time}</span>
        </aside>
      </div>
    </div>
  );
}

function AccessBox(props) {
  const {
    shortName = "",
    _id = "",
    sessionNumber = "",
    title = "",
    time = "",
  } = props;
  return (
    <Link
      className={"block bg-bg-accent/20 p-2 rounded-lg"}
      to={fromMain(`${Main.session_info}/${shortName}/${_id}`)}
    >
      <div
        className="
                flex
                justify-between 
                items-center 
                gap-x-2
                text-dark 
                dark:text-light 
                font-dana-md
                text-sm
                md:text-base
                "
      >
        <aside className="flex items-center gap-x-3">
          <Tag width="30px" height="30px" padding="0" text={sessionNumber} />
          <HiOutlinePlay className="size-6 success-text" />
          <p className=" text-sm">{title}</p>
        </aside>
        <aside>
          <span>{time}</span>
        </aside>
      </div>
    </Link>
  );
}
