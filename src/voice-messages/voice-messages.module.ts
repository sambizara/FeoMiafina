import { Module } from '@nestjs/common';
import { VoiceMessagesController } from './voice-messages.controller';
import { VoiceMessagesService } from './voice-messages.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VoiceMessagesController],
  providers: [VoiceMessagesService]
})
export class VoiceMessagesModule {}
