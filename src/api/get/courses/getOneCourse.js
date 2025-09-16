export default async function getOneCourse({ param, headers }) {
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/courses/${param}`,
    headers
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
