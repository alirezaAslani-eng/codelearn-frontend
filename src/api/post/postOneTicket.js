export default async function postOneTicket({ body, headers }) {
  const res = await fetch("https://codelearn-backend.onrender.com/v1/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
