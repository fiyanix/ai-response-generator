import React, { useState, useRef } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { ResponseForm } from './components/ResponseForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { generateAIResponse } from './lib/api';

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = {
        message: formData.get('message') as string,
        tone: formData.get('tone') as string,
        keyPoints: formData.get('keyPoints') as string,
        responseLength: Number(formData.get('responseLength')),
        language: formData.get('language') as string,
      };

      const result = await generateAIResponse(data);
      setResponse(result.response);
      
      // Scroll to response after it's generated
      if (responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate response');
      setResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Response Generator</h1>
                <p className="text-sm text-gray-500">Create perfect responses in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Powered by AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <ResponseForm onSubmit={handleSubmit} isLoading={isLoading} />
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          <div ref={responseRef}>
            <ResponseDisplay response={response} />
          </div>
        </div>
      </main>
    </div>
  );
}