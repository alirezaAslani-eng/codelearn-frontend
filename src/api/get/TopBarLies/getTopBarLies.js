export default async function getTopBarLies() {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/menus"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
