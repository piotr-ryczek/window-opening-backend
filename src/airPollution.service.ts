import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AirPollutionService {
  constructor(private readonly httpService: HttpService) {}

  async getData() {
    const { data: dataPM25, status: statusPM25 } = await firstValueFrom(
      this.httpService.get(
        'https://api.gios.gov.pl/pjp-api/rest/data/getData/2071',
      ),
    );

    const { data: dataPM10, status: statusPM10 } = await firstValueFrom(
      this.httpService.get(
        'https://api.gios.gov.pl/pjp-api/rest/data/getData/2069',
      ),
    );

    if (statusPM25 !== 200 || statusPM10 !== 200) {
      throw new Error('AirPollution query failed');
    }

    const { values: dataPM25Values } = dataPM25;
    const { values: dataPM10Values } = dataPM10;

    return {
      pm25: [dataPM25Values[0], dataPM25Values[1], dataPM25Values[2]],
      pm10: [dataPM10Values[0], dataPM10Values[1], dataPM10Values[2]],
    };
  }
}
