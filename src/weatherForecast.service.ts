import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherForecastService {
    constructor(private readonly httpService: HttpService) {}
"forecast?lat=" + locationLat + "&lon=" + locationLon + "&appid=" + weatherApiKey + "&units=Metric";
    async getData() {
        const { data } = await firstValueFrom(this.httpService.get(`https://api.gios.gov.pl/pjp-api/rest/data/getData/forecast?lat=${51.760229}&lon=${19.550675}&appid=${process.env.WEATHER_FORECAST_API_KEY}&units=Metric`));

        return data;
    }
}
