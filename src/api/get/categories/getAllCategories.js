export default async function getAllCategories() {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/category"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
