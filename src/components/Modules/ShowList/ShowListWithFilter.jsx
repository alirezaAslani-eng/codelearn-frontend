import { useContext, useEffect } from "react";
import { FilterBarMobile, SideBarFilter } from "../../Ui";
import { FilterContext } from "../../../context/FilterContext";
import { useMediaQuery } from "@mui/material";
import LoadeingErrorHandler from "../LoadeingErrorHandler/LoadeingErrorHandler";

export default function ShowListWithFilter({
  data,
  isLoading = false,
  isError = false,
  loaderComponent = <></>,
  Component = () => {},
  serachPath = "title",
  free = true,
  preSale = true,
  serach = true,
  category = true,
  hasMenuButtonInMobIle = true,
}) {
  const isDesktop = useMediaQuery("(min-width:840px");

  const {
    setDataState,
    // filter by search - >
    startOneSearch,
    cleanSearchResult,
    isSearching,
    searchedValue,
    // filter by checkBox - >
    startToggle,
    toggles,
    result: filteredData,
  } = useContext(FilterContext);


  useEffect(() => {
    setDataState({ data: data?.filter((item) => item) || [] });
  }, [data]);

  return (
    <>
      <section className="_840:flex _840:gap-x-4">
        {isDesktop && (
          <div className="flex flex-col">
            <div className="w-[250px] hidden _840:block sticky top-[95px] z-[2]">
              <SideBarFilter
                onSearch={({ value }) =>
                  startOneSearch({ path: serachPath, valueToSearch: value })
                }
                onCancelSearch={cleanSearchResult}
                onChecked={startToggle}
                // filter state
                isSearching={isSearching}
                toggleStates={toggles}
                // option -- >
                free={free}
                preSale={preSale}
                serach={serach}
                category={category}
              />
            </div>
          </div>
        )}
        {!isDesktop && (
          <div className="p-1 block _840:hidden sticky top-[80px] z-[3] bg-primary-light/50 dark:bg-primary-dark/50 rounded-xl">
            <FilterBarMobile
              toggleStates={toggles}
              isSearching={isSearching}
              onCancelSearch={cleanSearchResult}
              onChecked={startToggle}
              hasMenuButton={hasMenuButtonInMobIle}
              onSearch={({ value }) =>
                startOneSearch({ path: serachPath, valueToSearch: value })
              }
              free={free}
              preSale={preSale}
            />
          </div>
        )}

        <div className="flex-1 min-h-[200px] relative grid xs:grid-cols-2 _840:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 _840:mt-0">
          <LoadeingErrorHandler
            isLoading={{
              check: isLoading,
              loading: loaderComponent,
            }}
            isError={{ check: isError, error: loaderComponent }}
          >
            {filteredData?.map((item, index) => {
              return <Component key={item?._id || index} {...item} />;
            })}
          </LoadeingErrorHandler>
          <div className="absolute abs-center text-center font-dana-md">
            {searchedValue?.result
              ? null
              : `نتیجه ای برای ${searchedValue?.value} یافت نشد`}
          </div>
        </div>
      </section>
    </>
  );
}
