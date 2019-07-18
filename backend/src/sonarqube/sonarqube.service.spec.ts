import { Test, TestingModule } from '@nestjs/testing';
import { SonarqubeService } from './sonarqube.service';

describe('SonarqubeService', () => {
  let service: SonarqubeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SonarqubeService],
    }).compile();

    service = module.get<SonarqubeService>(SonarqubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
