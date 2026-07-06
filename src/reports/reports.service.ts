import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepository: Repository<Report>) {}

    async createReport(reportBody: CreateReportDto): Promise<Report> {
        const newReport = await this.reportsRepository.create(reportBody);
        if (!newReport) {
            throw new Error('Failed to create a new report');
        }
        return this.reportsRepository.save(newReport);
    }
}
