import React, { useState, useEffect } from 'react';
import { Command } from 'lucide-react';
import { ToneSelector } from './ToneSelector';
import { CharacterCount } from './CharacterCount';
import { LanguageSelector } from './LanguageSelector';

interface ResponseFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function ResponseForm({ onSubmit, isLoading }: ResponseFormProps) {
  const [message, setMessage] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [responseLength, setResponseLength] = useState(100);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  useEffect(() => {
    const textArea = document.querySelector('textarea[name="message"]');
    if (textArea) {
      textArea.addEventListener('keydown', handleKeyDown);
      return () => textArea.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLoading]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
          <CharacterCount current={message.length} max={2000} />
        </label>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your message here... (Press Enter to generate)"
          rows={4}
          maxLength={2000}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tone <span className="text-gray-500">(optional)</span>
        </label>
        <ToneSelector />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Points to Address <span className="text-gray-500">(optional)</span>
          <CharacterCount current={keyPoints.length} max={1000} />
        </label>
        <textarea
          name="keyPoints"
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter key points to address..."
          rows={3}
          maxLength={1000}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Language <span className="text-gray-500">(optional)</span>
        </label>
        <LanguageSelector />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Response Length
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            name="responseLength"
            min="50"
            max="500"
            value={responseLength}
            onChange={(e) => setResponseLength(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 min-w-[3ch]">{responseLength}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              Generate
              <Command className="h-4 w-4 opacity-70" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}