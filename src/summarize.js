export async function summarizeThread(thread) {
  const res = await fetch('/api/chat-v7', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: thread }),
  });
  return res;
}
