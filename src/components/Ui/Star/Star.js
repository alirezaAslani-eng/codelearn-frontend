import { v4 as uuid } from "uuid";
import { HiStar } from "../icons/icons";
export default function Star({ count }) {
  const stars = Array.from({ length: count }, (_, index) => ({
    id: uuid(),
    star: index + 1,
  }));

  return (
    <div className="flex items-center gap-px">
      {stars.map((item) => (
        <HiStar key={item.id} className="text-bg-accent" />
      ))}
    </div>
  );
}
