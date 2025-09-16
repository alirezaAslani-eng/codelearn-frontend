export default async function getAllTicketDepartments() {
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/tickets/departments"
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
