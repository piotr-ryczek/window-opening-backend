import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class LogConfig {
  @Prop()
  weatherLogNotOlderThanHours: number;

  @Prop()
  pm25Norm: number;

  @Prop()
  pm10Norm: number;

  @Prop()
  pm25Weight: number;

  @Prop()
  pm10Weight: number;

  @Prop()
  maxOutsideTemperatureDiffFromOptimal: number;

  @Prop()
  outsideTemperatureClosingThreshold: number;

  @Prop()
  optimalTemperature: number;

  @Prop()
  pTermPositive: number;

  @Prop()
  pTermNegative: number;

  @Prop()
  dTermPositive: number;

  @Prop()
  dTermNegative: number;

  @Prop()
  oTermPositive: number;

  @Prop()
  oTermNegative: number;

  @Prop()
  iTerm: number;

  @Prop()
  openingTermPositiveTemperatureIncrease: number;

  @Prop()
  changeDiffThreshold: number;
}

export const LogConfigSchema = SchemaFactory.createForClass(LogConfig);

@Schema()
export class LogPartialData {
  @Prop()
  proportionalTermValue: number;

  @Prop()
  integralTermValue: number;

  @Prop()
  derivativeTermValue: number;

  @Prop()
  openingTermValue: number;

  @Prop({
    required: false,
  })
  outsideTemperatureTermValue: number;

  @Prop({
    required: false,
  })
  airPollutionTermValue: number;
}

export const LogPartialDataSchema =
  SchemaFactory.createForClass(LogPartialData);

@Schema()
export class Log {
  @Prop({
    required: true,
  })
  windowOpening: number;

  @Prop({
    required: true,
  })
  deltaTemporaryWindowOpening: number;

  @Prop({
    required: true,
  })
  deltaFinalWindowOpening: number;

  @Prop({
    required: true,
  })
  insideTemperature: number;

  @Prop({
    required: false,
  })
  outsideTemperature?: number;

  @Prop({
    required: false,
  })
  pm25?: number;

  @Prop({
    required: false,
  })
  pm10?: number;

  @Prop({
    type: LogConfigSchema,
  })
  config: LogConfig;

  @Prop({
    type: LogPartialDataSchema,
  })
  partialData: LogPartialData;

  @Prop({
    default: () => new Date(),
  })
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
