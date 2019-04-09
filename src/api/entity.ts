import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Idea from '../ideas/entity';
// import User from '../users/entity';


@Entity()
export default class AutoMatch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('jsonb', { nullable: true })
  autoMatch: JSON

  @OneToOne(_type => Idea)
  idea: Idea

  // @ManyToOne(_type => User, user => user.api)
  // user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

}