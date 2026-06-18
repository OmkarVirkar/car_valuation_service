import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ReportsController } from './reports/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'better-sqlite3', // Says what kind of database to use
    database: 'db.sqlite',
    entities: [],
    synchronize: true,
  })],
  controllers: [AppController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
