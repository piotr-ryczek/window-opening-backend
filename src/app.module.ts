import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './log.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGO_URL,
        }
      }
    }),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class AppModule {}
