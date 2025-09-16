import  { memo, useEffect, useState } from "react";

export default function HocGetNowDate(Component) {
  const WithDate = (props) => {
    const [fullDate, setFullDate] = useState(""); // full date mens day / month / year

    useEffect(() => {
      setFullDate(getIrDate());
    }, []);

    return <Component {...props} date={fullDate} />;
  };
  return memo(WithDate);
}

function getIrDate() {
  // date option -- >
  const options = {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  function getMonth(month) {
    // "01" to "فروردین"
    const enMonth = irMonthtoEn(month);
    switch (enMonth) {
      case "01":
        return "فروردین";
      case "02":
        return "اردیبهشت";
      case "03":
        return "خرداد";
      case "04":
        return "تیر";
      case "05":
        return "مرداد";
      case "06":
        return "شهریور";
      case "07":
        return "مهر";
      case "08":
        return "آبان";
      case "09":
        return "آذر";
      case "10":
        return "دی";
      case "11":
        return "بهمن";
      case "12":
        return "اسفند";
      default:
        return "";
    }
  }
  function irMonthtoEn(number) {
    // "۰۱" to "01"
    switch (number) {
      case "۰۰": {
        return "00";
      }
      case "۰۱": {
        return "01";
      }
      case "۰۲": {
        return "02";
      }
      case "۰۳": {
        return "03";
      }
      case "۰۴": {
        return "04";
      }
      case "۰۵": {
        return "05";
      }
      case "۰۶": {
        return "06";
      }
      case "۰۷": {
        return "07";
      }
      case "۰۸": {
        return "08";
      }
      case "۰۹": {
        return "09";
      }
      case "۱۰": {
        return "10";
      }
      case "۱۱": {
        return "11";
      }
      case "۱۲": {
        return "12";
      }
    }
  }
  const Date_inctanse = new Date();
  // Ir full time -- >
  const Ir_time = Date_inctanse.toLocaleString("fa-IR", options);
  console.log(Ir_time);

  // Ir-Month -- >
  const Ir_day = Ir_time.split(",")[0].split("/")[2];
  const Ir_month = getMonth(Ir_time.split(",")[0].split("/")[1]); // getMonth get this -> "۰۱" and turn it to this "فروردین"
  const Ir_year = Ir_time.split(",")[0].split("/")[0];
  // format date here --->
  return `${Ir_day} ${Ir_month} ${Ir_year}`;
}
