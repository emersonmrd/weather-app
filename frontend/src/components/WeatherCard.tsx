import { WeatherResponse } from "@/types/weather";

interface Props {
  weather: WeatherResponse["data"];
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
        <h2 className="text-3xl font-bold mb-2">{weather.city}</h2>
        <p className="text-blue-100 text-sm">Condições atuais</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <div className="flex-shrink-0">
              <svg
                className="w-12 h-12 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Temperatura</p>
              <p className="text-3xl font-bold text-gray-900">
                {weather.temperature}°C
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="flex-shrink-0">
              <svg
                className="w-12 h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Velocidade do Vento
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {weather.windspeed} <span className="text-lg">km/h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
