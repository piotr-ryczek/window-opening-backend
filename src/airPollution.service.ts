import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AirPollutionService {
    constructor(private readonly httpService: HttpService) {}

    async getData() {
        const { dataPM25 } = await firstValueFrom(this.httpService.get('http://api.openweathermap.org/data/2.5/2071'));
        const { dataPM10 } = await firstValueFrom(this.httpService.get('http://api.openweathermap.org/data/2.5/2069'));
        

        return data;
    }
}