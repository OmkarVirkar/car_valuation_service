import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('loads the user relation when approving a report', async () => {
    const report = { id: 1, approved: false, user: { id: 10 } };
    const repository = {
      findOne: jest.fn().mockResolvedValue(report),
      save: jest.fn().mockResolvedValue({ ...report, approved: true }),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: repository,
        },
      ],
    }).compile();

    const serviceWithRepo = module.get<ReportsService>(ReportsService);

    const result = await serviceWithRepo.changeApproval('1', true);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['user'],
    });
    expect(result.approved).toBe(true);
    expect(result.user).toEqual({ id: 10 });
  });
});
