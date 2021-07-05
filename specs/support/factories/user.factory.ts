import faker from 'faker';
import { FactoryBot } from 'factory-bot-ts';

import { Role } from '@App/common/auth/roles.enum';
import { UserEntity } from '@App/modules/resources/entities/user.entity';
import { CompanyFactoryProps } from './company.factory';

FactoryBot.define.call(FactoryBot, CompanyFactoryProps);

const UserFactoryProps = [
  'user',
  {
    id: () => faker.datatype.uuid(),
    email: () => faker.internet.email(),
    name: () => faker.internet.userName(),
    role: () => (Math.random() > 0.5 ? Role.ADMIN : Role.CUSTOMER),
    company: () => FactoryBot.build('company'),
  },
  UserEntity,
];

export { UserFactoryProps };
