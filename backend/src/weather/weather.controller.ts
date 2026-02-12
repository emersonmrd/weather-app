import { Controller, Get, Query } from '@nestjs/common';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

    @Get()
    getWeather(@Query() query: GetWeatherDto) {
        return this.weatherService.getWeatherByCity(query.city);
    }
}
