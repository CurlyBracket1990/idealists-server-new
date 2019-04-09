import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsNotEmpty } from 'class-validator';


@Entity()
export default class Quest extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @IsNotEmpty()
  @Column('jsonb', { nullable: false })
  quest: JSON
}