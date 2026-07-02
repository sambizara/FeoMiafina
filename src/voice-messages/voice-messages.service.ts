import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VoiceMessagesService {
  constructor(private prisma: PrismaService) {}

  async sendVoice(file: Express.Multer.File, receiverId: string, senderId: string) {
    // dossier stockage
    const uploadDir = './uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // nom unique fichier
    const fileName = `${Date.now()}-${file.originalname}`;

    const filePath = path.join(uploadDir, fileName);

    // sauvegarde fichier
    fs.writeFileSync(filePath, file.buffer);

    // URL (simple local pour l’instant)
    const audioUrl = `http://localhost:3000/uploads/${fileName}`;

    // sauvegarde DB
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