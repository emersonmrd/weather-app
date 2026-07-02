import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherByCity(city: string) {
    const formattedCity = city.replace('-', ' ');
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(formattedCity)}&count=1`;

    let geoResponse;
    try {
      geoResponse = await firstValueFrom(this.httpService.get(geoUrl));
    } catch (error: any) {
      console.error('Erro na API de Geocoding:', error?.response?.data || error.message);
      return { success: false, message: 'Erro ao conectar com serviço de clima (Geo)' };
    }

    const location = geoResponse.data.results?.[0];

    if (!location) {
      return { success: false, message: 'Cidade não encontrada' };
    }

    const { latitude, longitude } = location;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    let weatherResponse;
    try {
      weatherResponse = await firstValueFrom(this.httpService.get(weatherUrl));
    } catch (error: any) {
      console.error('Erro na API de Clima:', error?.response?.data || error.message);
      return { success: false, message: 'Erro ao conectar com serviço de clima (Weather)' };
    }

    return {
      success: true,
      data: {
        city: location.name,
        temperature: weatherResponse.data.current_weather.temperature,
        windspeed: weatherResponse.data.current_weather.windspeed,
      }
    };
  }
}
