import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherForecastService {
  constructor(private readonly httpService: HttpService) {}
  async getData() {
    const { data, status } = await firstValueFrom(
      this.httpService.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${51.760229}&lon=${19.550675}&appid=${process.env.WEATHER_FORECAST_API_KEY}&units=Metric`,
      ),
    );

    if (status !== 200) {
      throw new Error('WeatherForecast query failed');
    }

    const { list } = data;

    const parsedList = list.map((item) => {
      const {
        main: { temp },
        wind: { speed },
        dt_txt,
      } = item;

      return {
        temperature: temp,
        windSpeed: speed,
        date: dt_txt,
      };
    });

    return [
      parsedList[0],
      parsedList[1],
      parsedList[2],
      parsedList[3],
      parsedList[4],
    ];
  }
}
