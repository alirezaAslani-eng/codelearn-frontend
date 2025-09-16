  const getLink = ({ href = "", clientRoute = "" } = {}) => {
    try {
      if (href?.[0] == "/") {
        return href;
      } else {
        return `${clientRoute}${href}`;
      }
    } catch (err) {
      console.log(err);
    }
  };


  export default getLink