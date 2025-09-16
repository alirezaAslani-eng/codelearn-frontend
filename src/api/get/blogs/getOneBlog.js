export default async function getAllBlogs({ headers, param }) {
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/articles/${param}`,
    {
      headers,
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
