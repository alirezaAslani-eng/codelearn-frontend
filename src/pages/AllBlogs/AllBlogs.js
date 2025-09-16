import { FilterProvider } from "../../context/FilterContext";
import { ShowListWithFilter } from "../../components/Modules";
import { useParams } from "react-router-dom";
import {
  BlogBox,
  BlogBoxLoader,
  BreadCrump,
  Tag,
  TitleWithEffect,
} from "../../components/Ui";
import { useBreadCrump } from "../../hooks";
import { fromMain, Main } from "../../routes/clientPath";
export default function AllBlogs({ data, isLoading, isError }) {
  const { categoryId } = useParams();
  useBreadCrump({
    breadCrumpArray: [{ text: "مقاله ها", link: fromMain(Main.blogs) }],
  });
  return (
    <div className="container">
      <section className="mt-3 sm:mt-6">
        <BreadCrump />
      </section>
      <section className="flex items-center justify-between my-5 _840:my-10 font-dana-md">
        <TitleWithEffect>تمام مقاله ها</TitleWithEffect>
        <Tag
          text={
            <div className="flex items-center gap-x-1 font-dana-md">
              {data?.length}
              <h1>مقاله</h1>
            </div>
          }
        />
      </section>

      <FilterProvider>
        <ShowListWithFilter
          loaderComponent={<BlogBoxLoader count={10} />}
          isError={isError}
          isLoading={isLoading}
          Component={BlogBox}
          data={data}
          free={false}
          hasMenuButtonInMobIle={false}
          preSale={false}
          categoryId={categoryId}
          serachPath="title"
        />
      </FilterProvider>
    </div>
  );
}
