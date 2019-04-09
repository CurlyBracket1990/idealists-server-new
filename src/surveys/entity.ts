import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Group from '../groups/entity';


@Entity()
export default class Survey extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @OneToMany(_type => Group, groups => groups.survey, { eager: true })
  groups: Group[];

}