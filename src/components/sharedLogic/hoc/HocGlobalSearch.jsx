import  { memo, useCallback, useState } from "react";

function hocGlobalSearch(Component) {
  const WithGlogalSearch = (props) => {
    const [searchValuer, setSearchValue] = useState("npm");
    const searchHandler = useCallback((value) => {
      setSearchValue(value);
    });
    return (
      <Component
        onChange={searchHandler}
        to={`search/${searchValuer}`}
        {...props}
      />
    );
  };
  return memo(WithGlogalSearch);
}

export default hocGlobalSearch;
