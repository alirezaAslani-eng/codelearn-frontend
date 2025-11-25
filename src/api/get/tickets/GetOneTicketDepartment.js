export default async function GetOneTicketDepartment({ param }) {
  const res = await fetch(
    `https://codelearn-backend-production.up.railway.app/v1/tickets/departments-subs/${param}`
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
