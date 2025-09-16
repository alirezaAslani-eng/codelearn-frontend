export default function FeatureBox({
  text = "",
  subText = "",
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-center flex-col gap-1 _840:gap-2 animate-initialShow font-dana-md text-sm 3xs:text-lg _840:text-xl text-center ${className}`}
    >
      <div className="bg-bg-accent/30 size-[50px] flex items-center justify-center rounded-full">{text}</div>
      <div className="text-light/90">{subText}</div>
    </div>
  );
}
