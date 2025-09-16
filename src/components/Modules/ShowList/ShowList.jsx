import  { memo, useContext, useEffect } from "react";
import { Table } from "../index";
import { FilterContext } from "../../../context/FilterContext";
import { usePagination } from "../../../hooks";
import { SelectInput } from "../../Ui";
const defProps = {
  data: [],
  filterList: [],
  cols: [],
  rows: [],
};
function ShowList({
  filterList = defProps.filterList,
  cols = defProps.cols,
  rows = defProps.rows,
}) {
  // FilterContext -- >
  const {
    startOption,
    setDataState,
    result: filteredState,
  } = useContext(FilterContext);
  // Pagination hook -- >
  const { endIndex, startIndex, pageCount, currentPage, setCurrentPage } =
    usePagination({
      initialPage: 1,
      per: 10,
      dataLenth: filteredState?.length || 0,
    });
  // Effetcs --- >
  useEffect(() => {
    setDataState({ data: rows || [] });
  }, [rows]);

  const rowBuilder = () => {
    try {
      return filteredState?.slice(startIndex, endIndex);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    if (pageCount <= 0) return;
    // when pageCount become fewer than currentPage for example user click on page 50 and at the same time they apply a filter and that filter cause change page count !
    if (pageCount < currentPage) {
      setCurrentPage(pageCount);
    } else {
      return;
    }
  }, [currentPage, pageCount]);

  return (
    <div>
      {/* Drop down filtering  */}
      <section className="w-[min(200px,100%)] mb-5">
        <SelectInput
          onChange={(_, obj) =>
            startOption({
              defaultState: obj?.defaultState,
              path: obj?.path,
              value: obj?.value,
            })
          }
          className="flex items-center justify-between p-3 rounded-lg bg-secondary-light shadow dark:bg-secondary-dark"
          defaultClassName={false}
          options={filterList || []}
        />
      </section>
      {/* Table */}
      <section className="font-dana-md overflow-hidden rounded-xl">
        <Table cols={cols} rows={rowBuilder()} empty={<>نتیجه ای یافت نشد</>} />
      </section>
      {/* Pagination button */}
      <section className="my-10 flex justify-center">
        <div className="flex justify-center relative !z-[1]">
        </div>
      </section>
    </div>
  );
}
export default memo(ShowList);
