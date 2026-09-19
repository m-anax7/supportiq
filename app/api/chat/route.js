export async function POST(req) {
  try {
    const { message } = await req.json();
    const key = "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";
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'groq/compound-mini',
        messages: [{ role: 'user', content: message }],
        max_tokens: 200
      })
    });
    const data = await response.json();
    console.log('GROQ:', JSON.stringify(data));
    const reply = data.choices?.[0]?.message?.content || 'No response';
    return Response.json({ reply, confidence: 0.92, escalate: false });
  } catch(e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}