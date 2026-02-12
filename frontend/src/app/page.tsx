"use client";

import WeatherCard from "@/components/WeatherCard";
import WeatherForm from "@/components/WeatherForm";
import { getWeather } from "@/services/weather.service";
import { useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await getWeather(city);
      setWeather(data.data);
    } catch (err) {
      setError("Cidade não encontrada");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Weather App</h1>
          <p className="text-gray-600">
            Consulte a previsão do tempo para qualquer cidade
          </p>
        </div>

        <WeatherForm onSearch={handleSearch} />

        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-700 font-medium">Carregando...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {weather && <WeatherCard weather={weather} />}
      </div>
    </main>
  );
}
