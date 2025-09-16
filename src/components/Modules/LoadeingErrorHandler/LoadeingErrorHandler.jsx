
const defProps = {
  isError: {
    error: <></>, //  < -- render this if check == true
    check: false,
  },
  isLoading: {
    loading: <></>, // < -- render this if check == true
    check: false,
  },
  dataCheck: {
    error: <></>, // < -- render this if check == false
    check: true,
  },
};
export default function LoadeingErrorHandler({
  isLoading = defProps.isLoading,
  isError = defProps.isError,
  dataCheck = defProps.dataCheck,
  children,
}) {
  if (isLoading?.check) return isLoading?.loading;
  else if (isError?.check) return isError?.error;
  else if (!dataCheck?.check) return dataCheck?.error;

  if (children) return <>{children}</>;
}
// COPY TI -- >
// isError= {{
//     error: <></>,
//     check: true,
//   }}
//   isLoading= {{
//     loading: <></>,
//     check: true,
//   }}
//   dataCheck= {{
//     error: <></>,
//     check: false,
//   }}
