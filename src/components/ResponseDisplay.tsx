import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface ResponseDisplayProps {
  response: string;
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!response) return null;

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Generated Response</h3>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 transition-colors"
        >
          {copied ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{response}</div>
      </div>
    </div>
  );
}