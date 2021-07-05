import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Factory, Seeder } from 'typeorm-seeding';
import faker from 'faker';

export class AddCompanies implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('companies')
      .values({ name: `Empresa ${faker.random.word()}`, id: uuidv4() })
      .execute();
  }
}
