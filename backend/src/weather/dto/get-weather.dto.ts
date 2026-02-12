import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherDto {
  @IsString()
  @IsNotEmpty()
  city!: string;
}
