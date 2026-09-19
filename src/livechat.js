const sendMessage = async (message) => {
  const response = await fetch('/api/chat-v4', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return response.json();
};