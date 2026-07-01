import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VoiceMessagesService } from './voice-messages.service';
@Controller('voice')
export class VoiceMessagesController {
  constructor(private readonly service: VoiceMessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  @UseInterceptors(FileInterceptor('audio'))
  async sendVoice(
    @UploadedFile() file: any,
    @Body() body: { receiverId: string },
    @Req() req: any,
  ) {
    return this.service.sendVoice(file, body.receiverId, req.user.userId);
  }
}
