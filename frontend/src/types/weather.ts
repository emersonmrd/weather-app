export interface WeatherResponse {
  success: boolean;
  data: {
    city: string;
    temperature: number;
    windspeed: number;
  };
}
