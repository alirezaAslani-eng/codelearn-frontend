const defProps = {
  rows: [],
  cols: [],
  className: "",
  empty: <></>,
};
export default function Table({
  rows = defProps.rows,
  cols = defProps.cols,
  className = defProps.className,
  empty = defProps.empty,
}) {
  return (
    <div
      className={` relative overflow-x-auto accent-scroll shadow-md ${className}`}
    >
      <table className="w-full text-sm text-left rtl:text-right text-dark/70 dark:text-light/70">
        {rows && rows?.length ? (
          <>
            <thead className="text-xs sticky top-0  bg-secondary-light dark:bg-secondary-dark text-dark/90 dark:text-light/90">
              <tr>
                {cols?.map((item, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-nowrap"
                    >
                      {item?.title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-secondary-light dark:bg-secondary-dark   even:dark:!bg-primary-dark even:!bg-primary-light  "
                  >
                    {cols?.map((Col, colIndex) => {
                      if (Col?.customRender) {
                        return (
                          <td key={colIndex} className="px-6 py-4">
                            <Col.customRender row={row} />
                          </td>
                        );
                      }
                      return (
                        <td key={colIndex} className="px-6 py-4">
                          {row?.[Col?.propName]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          empty
        )}
      </table>
    </div>
  );
}
