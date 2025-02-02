import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './log.schema';
import { ConfigModule } from '@nestjs/config';
import { WeatherForecastService } from './weatherForecast.service';
import { AirPollutionService } from './airPollution.service';
import { HttpModule } from '@nestjs/axios';
import { ProxyApiController } from './proxyApi.controller';
import { CacheService } from './cacheService.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGO_URL,
        };
      },
    }),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    HttpModule,
  ],
  controllers: [LogsController, ProxyApiController],
  providers: [
    LogsService,
    WeatherForecastService,
    AirPollutionService,
    CacheService,
  ],
})
export class AppModule {}
