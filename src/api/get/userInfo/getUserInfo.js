const getUserInfo = async () => {
  const token = JSON.parse(localStorage.getItem("token")); // Get token <<<
  if (!token?.userToken) {
    throw "user is not login";
  }
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/auth/me",
    {
      headers: { Authorization: `Bearer ${token?.userToken}` },
    }
  );

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw jsonResponse;
  }

  return jsonResponse;
};
export default getUserInfo;
