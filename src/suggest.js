export async function suggestReply(context) {
  const res = await fetch('/api/chat-v6', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: context }),
  });
  return res;
}
