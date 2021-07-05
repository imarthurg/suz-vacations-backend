import faker from 'faker';

import { CompanyEntity } from '@App/modules/resources/entities/company.entity';

const CompanyFactoryProps = [
  'company',
  {
    id: () => faker.datatype.uuid(),
    name: () => faker.internet.userName(),
  },
  CompanyEntity,
];

export { CompanyFactoryProps };
