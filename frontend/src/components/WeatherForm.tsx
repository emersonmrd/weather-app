"use client";

import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

export default function WeatherForm({ onSearch }: Props) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite a cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!city.trim()}
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
