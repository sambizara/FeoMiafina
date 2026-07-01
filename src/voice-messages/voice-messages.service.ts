import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

interface UploadedVoiceFile {
  originalname: string;
  buffer: Buffer;
}

@Injectable()
export class VoiceMessagesService {
  constructor(private prisma: PrismaService) {}

  async sendVoice(file: UploadedVoiceFile, receiverId: string, senderId: string) {
    const uploadDir = './uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const audioUrl = `http://localhost:3000/uploads/${fileName}`;

    const message = await this.prisma.voiceMessage.create({
      data: {
        senderId,
        receiverId,
        audioUrl,
        duration: 0,
      },
    });

    return {
      message: 'Voice message envoyé',
      data: message,
    };
  }
}
