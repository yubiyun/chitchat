import { Test, TestingModule } from '@nestjs/testing';
import { QbotService } from './qbot.service';

describe('QbotService', () => {
  let service: QbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QbotService],
    }).compile();

    service = module.get<QbotService>(QbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
