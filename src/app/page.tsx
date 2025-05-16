'use client';

import { useState, KeyboardEvent } from 'react';
import { numberToWords } from '@/utils/number-utils';

export default function Home() {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConvert = () => {
    try {
      const num = parseInt(number, 10);
      if (isNaN(num)) {
        setError('Please enter a valid number');
        setResult('');
        return;
      }
      
      if (Math.abs(num) > 999999999999) {
        setError('Number is too large');
        setResult('');
        return;
      }
      
      setError('');
      setResult(numberToWords(num));
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Failed to convert number'}`);
      setResult('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <main className="max-w-3xl mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Number to Words Converter
          </h1>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <label 
                htmlFor="number" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Enter a number:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-lg"
                  placeholder="e.g. 42"
                />
                <button
                  onClick={handleConvert}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-lg font-medium"
                >
                  Convert
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>

            {result && (
              <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Result:
                </h2>
                <p className="text-gray-800 dark:text-gray-200 text-xl">
                  {result}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Enter a number and click &quot;Convert&quot; to see it in words.</p>
            <p className="mt-1">Supports positive and negative numbers up to ±999,999,999,999</p>
          </div>
        </div>
      </main>
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Number to Words Converter - Built with Next.js</p>
      </footer>
    </div>
  );
}
