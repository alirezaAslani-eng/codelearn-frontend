import { ResultsOfGlogalSearch } from "../../components/sections";
const defProps = {
  data: {},
};
export default function GlobalSearch({
  data = defProps.data,
  searchValue = "",
}) {
  return (
    <>
      <ResultsOfGlogalSearch data={data} searchValue={searchValue} />
    </>
  );
}
