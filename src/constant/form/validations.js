import z from "zod";
import allInputNames from "./inputNames";
const getFullNameValidation = () => {
  return z
    .string()
    .min("5", "حد اقل 5 کاراکتر")
    .max("20", "حد اکثر 10 کاراکتر"); // regex
};
const getUserNameValidation = () => {
  return z
    .string()
    .min("5", "حد اقل 5 کاراکتر")
    .max("20", "حد اکثر 20 کاراکتر"); // regex
};
const getEmilValidation = () => {
  return z.string().min("1", "فیلد خالی موند").regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,"ایمیل نا معتبر"); //regex
};
const getPhoneValidation = () => {
  return z.string().regex(/^09\d{9}$/,"شماره موبایل معتبر نیست"); // regex
};
const getPasswordValidation = () => {
  return z.string().min("8", "حد اقل 8 کاراکتر شامل عدد و حروف A تا Z"); // regex
};
const getTextAreaValidation = () => {
  return z.string().min("1", "فیلد خالی مونده داش !");
};
const getTicketTitleValidation = () => {
  return z.string().min("5", "حد اقل 5 کاراکتر وارد کنید").max("30", "حد اکثر 30 کاراکتر مجاز هست");
};


const registerValidations = z.object({
  [allInputNames.fullName]: getFullNameValidation(),
  [allInputNames.userName]: getUserNameValidation(),
  [allInputNames.email]: getEmilValidation(), // regex
  [allInputNames.phone]: getPhoneValidation(), // regex
  [allInputNames.password]: getPasswordValidation(), // regex
});
const contactUsValidations = z.object({
  [allInputNames.fullName]: getFullNameValidation(),
  [allInputNames.phone]: getPhoneValidation(),
  [allInputNames.email]: getEmilValidation(),
  [allInputNames.text_area]: getTextAreaValidation(),
});
const loginValidations = z.object({
  [allInputNames.email]: getEmilValidation(),
  [allInputNames.password]: getPasswordValidation(),
});
const EditUserValidations = z.object({
  [allInputNames.email]: getEmilValidation(),
  [allInputNames.password]: getPasswordValidation(),
  [allInputNames.fullName]: getFullNameValidation(),
  [allInputNames.phone]: getPhoneValidation(),
  [allInputNames.userName]: getUserNameValidation(),
});
const TicketValidations = z.object({
  [allInputNames.departmentID]: z.any(),
  [allInputNames.departmentSubID]: z.any(),
  [allInputNames.body]: z.string().min("5", "حد اقل 5 کاراکتر"),
  [allInputNames.priority]: z.any(),
  [allInputNames.title]: getTicketTitleValidation(),
  [allInputNames.course]: z.any(),
});
const sendCommentValidations = z.object({
  [allInputNames.body]: z.string().min("10", "حد اقل 10 کاراکتر!"),
  [allInputNames.courseShortName]: z.any(),
  [allInputNames.score]: z.any(),
});
export {
  sendCommentValidations,
  registerValidations,
  contactUsValidations,
  loginValidations,
  TicketValidations,
  EditUserValidations,
};
