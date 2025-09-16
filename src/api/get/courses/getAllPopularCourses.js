export default async function getAllPopularCourses() {
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/courses/popular"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
