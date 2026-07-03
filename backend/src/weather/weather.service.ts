import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherByCity(city: string) {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      return { success: false, message: 'Chave da API (OPENWEATHERMAP_API_KEY) não configurada no servidor' };
    }

    const formattedCity = city.replace('-', ' ');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&appid=${apiKey}&units=metric&lang=pt_br`;

    let response;
    try {
      response = await firstValueFrom(this.httpService.get(url));
    } catch (error: any) {
      console.error('Erro na API OpenWeatherMap:', error?.response?.data || error.message);
      if (error?.response?.status === 404) {
        return { success: false, message: 'Cidade não encontrada' };
      }
      return { success: false, message: 'Erro ao conectar com serviço de clima' };
    }

    const data = response.data;

    return {
      success: true,
      data: {
        city: data.name,
        temperature: data.main.temp,
        windspeed: Number((data.wind.speed * 3.6).toFixed(1)), // convert m/s to km/h
      }
    };
  }
}
