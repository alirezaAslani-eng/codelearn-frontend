export default async function getAllPreSaleCourses() {
  const res = await fetch(
    "https://codelearn-backend-production.up.railway.app/v1/courses/presell"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
