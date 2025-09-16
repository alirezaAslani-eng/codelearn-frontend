// components from Ui
import { CategoryBox } from "../../Ui/index";
import { fromMain, Main } from "../../../routes/clientPath";
export default function Categories({ data }) {
  return (
    <div>
      <div className="grid  _350:grid-cols-2 xs:flex items-center flex-wrap justify-center gap-4 md:gap-6 font-peyda-md">
        {data?.map((item) => {
          return (
            <CategoryBox
              hrefButton={fromMain(`${Main.category}/${item?.name || "frontend"}`)}
              key={item?._id}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
