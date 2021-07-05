import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class RecoverPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
