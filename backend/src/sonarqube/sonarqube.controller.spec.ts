import { Test, TestingModule } from '@nestjs/testing';
import { SonarqubeController } from './sonarqube.controller';

describe('Sonarqube Controller', () => {
  let controller: SonarqubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SonarqubeController],
    }).compile();

    controller = module.get<SonarqubeController>(SonarqubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
