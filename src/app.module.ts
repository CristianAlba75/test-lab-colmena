import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { dataSourceOptions } from './config/db/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
