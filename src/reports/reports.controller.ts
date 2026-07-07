import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import {AuthGuard} from "../guards/auth.guard";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {User} from "../users/users.entity";
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post('/createReport')
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    async createReport(@Body() reportBody: CreateReportDto, @CurrentUser() user: User) {
        return await this.reportsService.createReport(reportBody, user);
    }
}
