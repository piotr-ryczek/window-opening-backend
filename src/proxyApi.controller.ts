import {
  Body,
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiGuard } from './api.guard';
import { WeatherForecastService } from './weatherForecast.service';
import { AirPollutionService } from './airPollution.service';
import { CacheService } from './cacheService.service';

@Controller()
export class ProxyApiController {
  constructor(
    private readonly weatherForecastService: WeatherForecastService,
    private readonly airPollutionService: AirPollutionService,
    private readonly cacheService: CacheService,
  ) {}

  @Get('/weather-forecast')
  @UseGuards(new ApiGuard())
  async getWeatherForecast(@Res() res: Response) {
    const cachedData = this.cacheService.getWeatherForecastResponse();

    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await this.weatherForecastService.getData();
    this.cacheService.saveWeatherForecastResponse(data);

    return res.json(data);
  }

  @Get('/air-pollution')
  @UseGuards(new ApiGuard())
  async getAirPollution(@Res() res: Response) {
    const cachedData = this.cacheService.getAirPollutionResponse();

    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await this.airPollutionService.getData();
    this.cacheService.saveAirPollutionResponse(data);

    return res.json(data);
  }
}
