import { BadRequestException, NotFoundException } from '@nestjs/common';

export const checkNotExists = (entity: any, message: string) => {
  if (!entity) throw new NotFoundException(message);
};

export const checkExists = (entity: any, message: string) => {
  if (entity) throw new BadRequestException(message);
};
