export default async function getAllBlogs() {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/articles"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
