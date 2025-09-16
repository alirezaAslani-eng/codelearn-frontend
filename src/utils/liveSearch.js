const liveSearch = (
  data = [],
  property_name = "name",
  include_value = "string"
) => {
  return data.filter((item) => {
    return item[property_name]
      .toLowerCase()
      .includes(include_value.toLowerCase());
  });
};
export default liveSearch;
