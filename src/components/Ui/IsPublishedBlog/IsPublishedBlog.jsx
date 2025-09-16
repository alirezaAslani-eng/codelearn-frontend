export default function IsPublishedBlog({ is = false }) {
  return (
    <div className="flex items-center gap-2 [&>span]:block">
      <span>آیا این مقاله کامل هست</span>
      <div>
        {is ? (
          <span className="success-text">کامل شده</span>
        ) : (
          <span className="danger-text">نه هنوز</span>
        )}
      </div>
    </div>
  );
}
