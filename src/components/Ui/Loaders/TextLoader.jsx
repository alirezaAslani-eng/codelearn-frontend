
export default function TextLoader({
  lineCounte = 3,
  className = "!bg-dark/40",
}) {
  const _lineCounte = Array.from({ length: lineCounte }, (_, index) => {
    return index;
  });
  return (
    <>
      {_lineCounte?.map((item,index) => {
        return (
          <div key={index}>
            {/* <Skeleton className={className || ""} animation="wave" /> */}
            ---------------
          </div>
        );
      })}
    </>
  );
}
