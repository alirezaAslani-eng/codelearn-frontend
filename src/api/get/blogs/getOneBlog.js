export default async function getAllBlogs({ headers, param }) {
  const res = await fetch(`https://alireza-eng.ir/v1/articles/${param}`, {
    headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
