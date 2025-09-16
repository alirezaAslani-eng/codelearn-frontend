
export default function BlurPageBackGround({ children }) {
  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen font-dana-md">
      {/* Light */}
      <div className="bg-bg-accent w-24 h-24 blur-3xl absolute left-5 top-5"></div>
      {/* Blur */}
      <div className="w-full backdrop-blur-3xl relative z-[2] text-dark dark:text-light">
        {children}
      </div>
    </div>
  );
}
