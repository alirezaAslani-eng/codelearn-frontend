const getUserInfo = async ({ headers }) => {
  const res = await fetch("https://alireza-eng.ir/v1/orders", {
    headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }

  return jsonResponse;
};
export default getUserInfo;
