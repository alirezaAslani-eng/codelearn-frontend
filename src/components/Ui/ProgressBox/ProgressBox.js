import { memo } from "react";

export default memo(function ProgressBox({ percent = 90 }) {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark text-dark dark:text-light shadow p-3 w-full rounded-lg font-dana-md">
      <span>میزان پیشرفت شما : %{percent}</span>
      <div
        style={{ width: percent + "%" }}
        className="bg-bg-accent p-2 rounded-lg mt-1"
      ></div>
    </div>
  );
});
