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

@Controller()
export class ProxyApiController {
  constructor(private readonly weatherForecastService: WeatherForecastService, private readonly airPollutionService: AirPollutionService) {}

  @Get('/weather-forecast')
  @UseGuards(new ApiGuard())
  async getWeatherForecast(@Res() res: Response) {
    const data = await this.weatherForecastService.getData();

    return res.json({
      success: true,
    });
  }

  @Get('/air-pollution')
  @UseGuards(new ApiGuard())
  async getAirPollution(@Res() res: Response) {
    const data = await this.airPollutionService.getData();

    return res.json({
      success: true,
    });
  }
}
