export default async function getOneSession({ param, headers }) {
  const res = await fetch(
    `https://codelearn-backend-production.up.railway.app/v1/courses/${param}`,
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
