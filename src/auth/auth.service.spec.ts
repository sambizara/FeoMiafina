import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registers a new user and hashes the password', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    prisma.user.create.mockResolvedValue({
      id: 'user-1',
      username: 'alice',
      email: 'alice@example.com',
    });

    const result = await service.register({
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'alice@example.com' },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: 'alice',
        email: 'alice@example.com',
        passwordHash: 'hashed-password',
      },
    });
    expect(result).toEqual({
      message: 'Utilisateur créé avec succès',
      user: {
        id: 'user-1',
        username: 'alice',
        email: 'alice@example.com',
      },
    });
  });

  it('logs in an existing user with a valid password', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      username: 'alice',
      email: 'alice@example.com',
      passwordHash: 'hashed-password',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({
      email: 'alice@example.com',
      password: 'password123',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'alice@example.com' },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
    expect(result).toEqual({
      message: 'Connexion réussie',
      user: {
        id: 'user-1',
        username: 'alice',
        email: 'alice@example.com',
      },
    });
  });
});
