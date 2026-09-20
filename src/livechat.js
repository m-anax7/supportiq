export async function sendLiveChatMessage(message) {
  const res = await fetch('/api/chat-V4', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res;
}