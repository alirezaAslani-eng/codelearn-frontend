const addScript = (href, id) => {
  if (document.querySelector(`#${id}`)) return () => {}; // dont create again if we have it <<
  return new Promise((resolve, reject) => {
    if (window.videojs) {
      // if loaded alredy !!
      return resolve(window.videojs);
    }
    const script = document.createElement("script");
    script.src = href;
    script.defer = true;
    script.onload = () => {
      resolve(window.videojs);
      console.log("Video is created"); // test !
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
export default addScript;
