import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({
    message: 'Le nom d’utilisateur est obligatoire.',
  })
  username!: string;

  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  email!: string;

  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  })
  password!: string;
}