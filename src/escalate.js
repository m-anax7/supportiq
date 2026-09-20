export async function shouldEscalate(ticketContent) {
  const res = await fetch('/api/chat-V4', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: ticketContent }),
  });
  return res;
}