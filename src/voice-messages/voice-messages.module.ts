import { Module } from '@nestjs/common';
import { VoiceMessagesController } from './voice-messages.controller';
import { VoiceMessagesService } from './voice-messages.service';

@Module({
  controllers: [VoiceMessagesController],
  providers: [VoiceMessagesService]
})
export class VoiceMessagesModule {}
