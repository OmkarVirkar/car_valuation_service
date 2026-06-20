import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ReportsController } from './reports/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'better-sqlite3', // Says what kind of database to use
    database: 'db.sqlite',
    entities: [User, Report], // Tells TypeORM where to find the entities
    synchronize: true, // Automatically creates database tables based on entities (not recommended for production)
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
