export default async function getRelatedCourses({ param }) {
  const res = await fetch(`https://alireza-eng.ir/v1/courses/related/${param}`);
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
