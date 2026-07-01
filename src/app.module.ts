import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoiceMessagesModule } from './voice-messages/voice-messages.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, VoiceMessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
