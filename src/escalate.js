export async function shouldEscalate(ticketContent) {
  const res = await fetch('/api/chat-v7', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: ticketContent }),
  });
  return res;
}