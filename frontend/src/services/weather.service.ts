import { API_URL } from "@/lib/api";
import { WeatherResponse } from "@/types/weather";

export async function getWeather(city: string): Promise<WeatherResponse> {
  const response = await fetch(
    `${API_URL}/weather?city=${encodeURIComponent(city)}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar previsão");
  }

  return response.json();
}
