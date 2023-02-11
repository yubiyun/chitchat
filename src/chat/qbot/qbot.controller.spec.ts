import { Test, TestingModule } from '@nestjs/testing';
import { QbotController } from './qbot.controller';

describe('QbotController', () => {
  let controller: QbotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QbotController],
    }).compile();

    controller = module.get<QbotController>(QbotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
