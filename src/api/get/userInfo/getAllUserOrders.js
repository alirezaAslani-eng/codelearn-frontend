const getUserInfo = async ({ headers }) => {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/orders",
    {
      headers,
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }

  return jsonResponse;
};
export default getUserInfo;
