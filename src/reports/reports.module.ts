import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], // Creates a repository for the Report entity
  providers: [ReportsService]
})
export class ReportsModule {}
