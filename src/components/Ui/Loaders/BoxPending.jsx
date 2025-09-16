import { SkeletonLoader } from "../index";

export default function BoxPending({ count = 8 }) {
  const fakeList = Array.from({ length: count }, (_, index) => index); // for beter ux
  // when user still in loading or encounter an error, we show this ui >> (when_load_or_error) .
  return (
    <>
      {fakeList.map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </>
  );
}
