import { Link } from "react-router-dom";
import { Main } from "../../../routes/clientPath";
import { memo } from "react";

function Logo({ className, onClick = () => {} }) {
  return (
    <Link onClick={onClick} to={"/" + Main.root}>
      <img className={`${className}`} src="/images/logo.webp" alt="" />
    </Link>
  );
}
export default memo(Logo);
