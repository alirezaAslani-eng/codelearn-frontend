export default async function getCoursesBasedOnCategory({ param }) {
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/courses/category/${param}`
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
