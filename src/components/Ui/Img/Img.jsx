import { memo, useEffect, useRef, useState } from "react";
import { ShimmerLoader } from "..";

function Img({
  src = "",
  className = "",
  loaderClassName = "",
  loader = false,
  inViewPortOption = true,
  motion = true,
  lazy = true,
}) {
  const [imgIsLoade, setLoade] = useState(false); // when image is loaded !
  const [inViewPort, setInViewPort] = useState(inViewPortOption ? false : true); // when image show in view port!
  const [inViewed, setInViewed] = useState(inViewPortOption ? false : true); // to check for only once !
  const imgRef = useRef(null);
  useEffect(() => {
    if (!inViewPortOption) return; // if you dont want this option
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewPort(entry.isIntersecting); // check image is in view port or not -> true / false
        if (entry.isIntersecting) {
          setInViewed(true); // when the image is loaded we dont need to check again .
          observer.unobserve(imgRef.current);
        }
      },
      { rootMargin: "100%", root: imgRef.current.closest(".overflow-y-auto") }
    );
    observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <>
      {loader
        ? !imgIsLoade && (
            <div
              className={`w-full h-full overflow-hidden  ${loaderClassName}`}
            >
              <ShimmerLoader />
            </div>
          )
        : null}

      <img
        ref={imgRef}
        src={inViewPortOption ? (inViewed ? src : inViewPort ? src : null) : src}
        className={`${className}  transition-all duration-500 ${
          !motion && "opacity-100 visible"
        } ${
          motion
            ? imgIsLoade
              ? "visible opacity-1"
              : "invisible  opacity-0"
            : ""
        }`}
        onLoad={() => setLoade(true)}
        onError={() => setLoade(false)}
        loading={lazy ? "lazy" : "eager"}
      />
    </>
  );
}

export default memo(Img);
