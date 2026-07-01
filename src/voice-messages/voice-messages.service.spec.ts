import { Test, TestingModule } from '@nestjs/testing';
import { VoiceMessagesService } from './voice-messages.service';

describe('VoiceMessagesService', () => {
  let service: VoiceMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceMessagesService],
    }).compile();

    service = module.get<VoiceMessagesService>(VoiceMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
