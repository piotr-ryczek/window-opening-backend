import { Injectable } from '@nestjs/common';

const lastCachedData: {
  airPollution: {
    date: Date;
    data: any;
  };
  weatherForecast: {
    date: Date;
    data: any;
  };
} = {
  airPollution: {
    date: null,
    data: null,
  },
  weatherForecast: {
    date: null,
    data: null,
  },
};

@Injectable()
export class CacheService {
  private shouldUseCache(date: Date) {
    if (!date) return false;

    const now = new Date();

    const millisecondsDiff = now.getTime() - date.getTime();
    const hoursDiff = millisecondsDiff / 1000 / 60 / 60;

    return hoursDiff < 1;
  }

  getWeatherForecastResponse() {
    if (this.shouldUseCache(lastCachedData.weatherForecast.date)) {
      console.log('Using cache for WeatherForecast');
      return lastCachedData.weatherForecast.data;
    }

    return null;
  }

  getAirPollutionResponse() {
    if (this.shouldUseCache(lastCachedData.airPollution.date)) {
      console.log('Using cache for AirPollution');
      return lastCachedData.airPollution.data;
    }

    return null;
  }

  saveWeatherForecastResponse(data) {
    Object.assign(lastCachedData.weatherForecast, {
      data,
      date: new Date(),
    });
  }

  saveAirPollutionResponse(data) {
    Object.assign(lastCachedData.airPollution, {
      data,
      date: new Date(),
    });
  }
}
