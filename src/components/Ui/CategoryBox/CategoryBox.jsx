// components from Ui
import { Title } from "../Title";
import { Button } from "../Buttons";
const CategoryBox = ({ title, backImg = "", hrefButton = "" }) => {
  return (
    <div
      style={{ backgroundImage: `url(${backImg})` }}
      className="h-40 w-[min(250px,100%)] flex justify-between flex-col bg-secondary-light dark:bg-secondary-dark shadow rounded-lg p-3 pb-5 bg-no-repeat bg-cover bg-center "
    >
      <div className="w-full h-full flex justify-center items-center flex-col">
        <Title
          defaultColor={false}
          className="text-dark dark:text-light text-xl text-center"
          level="1"
        >
          {title}
        </Title>
      </div>
      <Button
        to={hrefButton}
        className="w-full bg-primary-light dark:bg-primary-dark text-dark dark:text-light rounded-lg p-2 shadow hover:shadow-bg-accent/50 hover:shadow-[_0px_0px_15px] transition-all"
      >
        شروع یادگیری
      </Button>
    </div>
  );
}
export default CategoryBox;
