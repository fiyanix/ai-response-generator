export async function generateAIResponse(data: {
  message: string;
  tone: string;
  keyPoints?: string;
  responseLength: number;
  language: string;
}) {
  const response = await fetch('https://ai-response-generator.netlify.app/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to generate response');
  }

  return response.json();
}
