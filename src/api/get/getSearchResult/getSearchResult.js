export default async function getResultOfSearch({ param }) {
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/search/${param}`
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
