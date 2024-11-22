import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

// Copying node_modules to myDevil
// scp -r ./node_modules/ Nero12@panel41.mydevil.net:~/domains/window-opening.nero12.usermd.net/public_nodejs
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
