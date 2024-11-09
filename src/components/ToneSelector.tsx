import React, { useState } from 'react';

const tones = [
  'Professional',
  'Friendly',
  'Empathetic',
  'Funny',
  'Formal',
  'Casual',
  'Assertive',
  'Apologetic'
];

export function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState('Professional');

  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => (
        <label
          key={tone}
          className={`inline-flex cursor-pointer items-center rounded-full px-4 py-1.5 text-sm transition-colors ${
            selectedTone === tone
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          <input
            type="radio"
            name="tone"
            value={tone}
            checked={selectedTone === tone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="sr-only"
          />
          {tone}
        </label>
      ))}
    </div>
  );
}