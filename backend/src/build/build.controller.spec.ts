import { Test, TestingModule } from '@nestjs/testing';
import { BuildController } from './build.controller';

describe('Build Controller', () => {
  let controller: BuildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildController],
    }).compile();

    controller = module.get<BuildController>(BuildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
