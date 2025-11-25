export default async function getIndex() {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/infos/index"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
