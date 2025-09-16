import { useMemo, useState } from "react";

export default function usePagination({
  initialPage = 1,
  per = 10,
  dataLenth = 0,
} = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage); // Current page
  const [itemPerPage] = useState(per); // Items per page
  const [startIndex, setStartIndex] = useState(0); // Start index
  const [endIndex, setEndIndex] = useState(2); // End index
  useMemo(() => {
    const start = (currentPage - 1) * itemPerPage;
    const end = currentPage * itemPerPage;
    setStartIndex(start);
    setEndIndex(end);
  }, [currentPage]);
  return {
    pageCount: Math.ceil(dataLenth / itemPerPage),
    currentPage,
    startIndex,
    endIndex,
    setCurrentPage,
  };
}
//Documentation
/*this hook will get props -> curentPage , itemsPerPga*/
// if you dont send prop, default prop will be applyed

/* At results, it returns these value : itemPerPage , currentPage , startIndex , endIndex
 and it returns this method setCurrentPage() for change pages handling */

// For example :
/*  const {itemPerPage, currentPage, startIndex, endIndex, setCurrentPage } = usePagination(1,5);*/

// you can make this process >>
// your data.length / itemPerPage = (page count) !!
