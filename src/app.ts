import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logger.interceptor';

// Copying node_modules to myDevil
// scp -r ./node_modules/ Nero12@panel41.mydevil.net:~/domains/window-opening.nero12.usermd.net/public_nodejs
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
