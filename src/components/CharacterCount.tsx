import React from 'react';

interface CharacterCountProps {
  current: number;
  max: number;
}

export function CharacterCount({ current, max }: CharacterCountProps) {
  const percentage = (current / max) * 100;
  const isNearLimit = percentage > 80;
  const isOverLimit = current > max;

  return (
    <div className="text-xs text-right">
      <span className={`${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-amber-500' : 'text-gray-500'}`}>
        {current}/{max}
      </span>
    </div>
  );
}