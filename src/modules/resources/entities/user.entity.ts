import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  salt: string;

  @Column({ type: 'varchar', nullable: false })
  role: string;

  @Column({
    name: 'accepted_use_terms',
    type: 'timestamp without time zone',
    nullable: true,
  })
  acceptedUseTerms: Date;

  @Column({ name: 'company_id', type: 'varchar', nullable: false })
  companyId: string;

  @ManyToOne(() => CompanyEntity, {
    eager: true,
  })
  @JoinColumn({
    name: 'company_id',
  })
  company: CompanyEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
