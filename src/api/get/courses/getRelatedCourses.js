export default async function getRelatedCourses({ param }) {
  const res = await fetch(
    `https://codelearn-backend-production.up.railway.app/v1/courses/related/${param}`
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
