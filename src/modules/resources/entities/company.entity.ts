import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'companies' })
export class CompanyEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
