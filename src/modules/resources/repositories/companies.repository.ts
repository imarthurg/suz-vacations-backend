import { EntityRepository, Repository } from 'typeorm';
import { CompanyEntity } from './../entities/company.entity';

@EntityRepository(CompanyEntity)
export class CompaniesRepository extends Repository<CompanyEntity> {}
