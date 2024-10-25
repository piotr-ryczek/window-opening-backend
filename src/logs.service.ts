import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './log.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async createLog(logData, partialData, config) {
    const {
      windowOpening,
      deltaTemporaryWindowOpening,
      deltaFinalWindowOpening,
      insideTemperature,
      outsideTemperature,
      pm25,
      pm10,
    } = logData;

    const {
      weatherLogNotOlderThanHours,
      pm25Norm,
      pm10Norm,
      pm25Weight,
      pm10Weight,
      maxOutsideTemperatureDiffFromOptimal,
      outsideTemperatureClosingThreshold,
      optimalTemperature,
      pTermPositive,
      pTermNegative,
      dTermPositive,
      dTermNegative,
      oTermPositive,
      oTermNegative,
      iTerm,
      openingTermPositiveTemperatureIncrease,
      changeDiffThreshold,
    } = config;

    const {
      proportionalTermValue,
      integralTermValue,
      derivativeTermValue,
      openingTermValue,
      outsideTemperatureTermValue,
      airPollutionTermValue,
    } = partialData;

    const newLog = new this.logModel({
      windowOpening,
      deltaTemporaryWindowOpening,
      deltaFinalWindowOpening,
      insideTemperature,
      outsideTemperature,
      pm25,
      pm10,
      config: {
        weatherLogNotOlderThanHours,
        pm25Norm,
        pm10Norm,
        pm25Weight,
        pm10Weight,
        maxOutsideTemperatureDiffFromOptimal,
        outsideTemperatureClosingThreshold,
        optimalTemperature,
        pTermPositive,
        pTermNegative,
        dTermPositive,
        dTermNegative,
        oTermPositive,
        oTermNegative,
        iTerm,
        openingTermPositiveTemperatureIncrease,
        changeDiffThreshold,
      },
      partialData: {
        proportionalTermValue,
        integralTermValue,
        derivativeTermValue,
        openingTermValue,
        outsideTemperatureTermValue,
        airPollutionTermValue,
      },
    });

    await newLog.save();
  }

  async getLogs(amount: number) {
    const logs = await this.logModel.find(
      {},
      {},
      {
        limit: amount,
        sort: {
          createdAt: -1,
        },
      },
    );

    return logs;
  }
}
