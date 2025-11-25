const getOneTicket = async ({ headers, param }) => {
  const res = await fetch(
    `https://codelearn-backend-production.up.railway.app/v1/tickets/answer/${param}`,
    {
      headers,
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }

  return jsonResponse;
};
export default getOneTicket;
