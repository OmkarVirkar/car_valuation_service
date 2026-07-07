import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepository: Repository<Report>) {}

    async createReport(reportBody: CreateReportDto, user: User): Promise<Report> {
        const newReport = await this.reportsRepository.create({ ...reportBody, user });
        if (!newReport) {
            throw new Error('Failed to create a new report');
        }
        return this.reportsRepository.save(newReport);
    }

    async approveReport(id: string, approved: boolean): Promise<Report> {
        const report = await this.reportsRepository.findOne({ where: { id: parseInt(id) } });
        if (!report) {
            throw new NotFoundException('Report not found');
        }
        report.approved = approved;
        return this.reportsRepository.save(report);
    }
}
