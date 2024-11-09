import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  { id: 'technology', name: 'Technology' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'business', name: 'Business' },
  { id: 'health', name: 'Health & Wellness' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food & Cooking' },
  { id: 'education', name: 'Education' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'sports', name: 'Sports' },
  { id: 'fashion', name: 'Fashion & Beauty' }
];

export function CategorySelector() {
  return (
    <div className="relative inline-block w-full">
      <select
        name="category"
        defaultValue="technology"
        className="appearance-none w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}