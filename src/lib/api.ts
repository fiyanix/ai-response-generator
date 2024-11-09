export async function generateAIResponse(data: {
  message: string;
  tone: string;
  keyPoints?: string;
  responseLength: number;
  language: string;
}) {
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to generate response');
  }

  return response.json();
}