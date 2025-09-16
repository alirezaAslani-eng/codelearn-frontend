function isActiveLink({
  defaultCalssName = "",
  isActive = false,
  actived = "",
  notActived = "",
} = {}) {
  return `${defaultCalssName} ${isActive ? actived : notActived}`;
}
export default isActiveLink;
