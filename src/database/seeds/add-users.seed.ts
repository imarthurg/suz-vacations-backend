import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Factory, Seeder } from 'typeorm-seeding';

export class AddUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const { identifiers } = await connection
      .createQueryBuilder()
      .insert()
      .into('companies')
      .values(buildCompany())
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(buildUsers(identifiers[0].id))
      .execute();
  }
}

function buildUsers(company_id: string) {
  const salts = [bcrypt.genSaltSync(10), bcrypt.genSaltSync(10)];
  return [
    {
      id: uuidv4(),
      name: 'Admin',
      email: 'admin@gts.com.br',
      password: bcrypt.hashSync('gts@1234', salts[0]),
      salt: salts[0],
      role: 'admin',
      companyId: company_id,
      company: {
        id: company_id,
      },
    },
    {
      id: uuidv4(),
      name: 'Customer',
      email: 'customer@gts.com.br',
      password: bcrypt.hashSync('gts@1234', salts[1]),
      salt: salts[1],
      role: 'customer',
      companyId: company_id,
      company: {
        id: company_id,
      },
    },
  ];
}

function buildCompany() {
  return {
    id: uuidv4(),
    name: 'GTS',
  };
}
