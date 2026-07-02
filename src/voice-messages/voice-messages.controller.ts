import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VoiceMessagesService } from './voice-messages.service';

@Controller('voice')
export class VoiceMessagesController {
  constructor(private service: VoiceMessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  @UseInterceptors(FileInterceptor('audio'))
  async sendVoice(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req,
  ) {
    return this.service.sendVoice(file, body.receiverId, req.user.userId);
  }
}