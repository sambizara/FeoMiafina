import { Test, TestingModule } from '@nestjs/testing';
import { VoiceMessagesController } from './voice-messages.controller';

describe('VoiceMessagesController', () => {
  let controller: VoiceMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceMessagesController],
    }).compile();

    controller = module.get<VoiceMessagesController>(VoiceMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
