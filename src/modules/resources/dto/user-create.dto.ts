import { Role } from '@App/common/auth/roles.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  acceptedUseTerms?: Date;
}
