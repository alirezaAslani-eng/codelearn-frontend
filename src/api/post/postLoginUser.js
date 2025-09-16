export default async function postLoginUser({ body }) {
  if (!body) throw new Error("you might didn't send body as a prop");
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw { response: jsonResponse, result: false };
  }
  return { response: jsonResponse, result: true };
}
