import { v4 as uuid } from "uuid";
export default function FormWarning({
  warningList = [
    "لطفا از مرور گر های به روز مانند گوگل کروم و فایر فاکس استفاده نمایید .",
    "ما هر گز اطلاعات محرمانه شما را از ایمیل درخواست نمیکنیم .",
    "اطلاعات و رمز عبور خود را در فواصل زمانی کوتاه تغیر دهید .",
  ],
  title = "سلام کاربر محترم :",
}) {
  return (
    <div className="text-right text-sm space-y-2">
      <span>{title}</span>
      {/* Warning */}
      <div className="text-xs space-y-2">
        {warningList.map((warning) => (
          <li key={uuid()}>{warning}</li>
        ))}
      </div>
    </div>
  );
}
