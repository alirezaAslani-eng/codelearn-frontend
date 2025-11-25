export default async function getAllContacts() {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/contact"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
