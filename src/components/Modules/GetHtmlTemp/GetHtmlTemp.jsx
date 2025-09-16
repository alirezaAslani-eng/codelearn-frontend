import { memo } from "react";
import DOMpurify from "dompurify";
import "./htmlTempCss.css";
export default memo(function GetHtmlTemp({ htmlTemplate }) {
  return (
    <div
      className="tempt-style"
      dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(htmlTemplate) }}
    ></div>
  );
});
