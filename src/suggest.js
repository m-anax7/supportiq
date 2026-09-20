export async function suggestReply(context) {
  const res = await fetch('/api/chat-V3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: context }),
  });
  return res;
}