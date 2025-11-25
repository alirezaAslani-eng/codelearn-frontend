export default async function postContactMessage({ body, headers }) {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/users",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
