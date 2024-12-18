import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { Response, Request } from 'express';
import { ApiGuard } from './api.guard';

@Controller()
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async getLogs(@Query('amount') amount: number, @Res() res: Response) {
    const logs = await this.logsService.getLogs(amount);

    return res.json({
      logs,
    });
  }

  @Post()
  @UseGuards(new ApiGuard())
  async createLog(@Body() body, @Res() res: Response) {
    const {
      // Required
      windowOpening,
      deltaTemporaryWindowOpening,
      deltaFinalWindowOpening,
      insideTemperature,
      config,
      partialData,
      // Optional
      outsideTemperature,
      pm25,
      pm10,
    } = body;

    await this.logsService.createLog(
      {
        windowOpening,
        deltaTemporaryWindowOpening,
        deltaFinalWindowOpening,
        insideTemperature,
        outsideTemperature,
        pm25,
        pm10,
      },
      partialData,
      config,
    );

    return res.json({
      success: true,
    });
  }
}
