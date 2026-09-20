export async function autoReply(ticketContent) {
  const res = await fetch('/api/chat-v9', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: ticketContent }),
  });
  return res;
}