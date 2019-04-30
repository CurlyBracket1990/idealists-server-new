import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne, AfterInsert, ManyToOne, JoinColumn, } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Idea from '../ideas/entity';
import { apiCompareRequest } from '../emails/emailOptions';
import sendEmail from '../emails/sendEmail';
import User from '../users/entity';


@Entity()
export default class AutoMatch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: true })
  ticket: string

  @Column('jsonb', { nullable: true })
  autoMatch: JSON

  @OneToOne(_type => Idea, idea => idea.autoMatch, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  idea: Idea

  @ManyToOne(_type => User, user => user.autoMatch, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @AfterInsert()
  async compareAutoMatchResults() {
    const usr = await User.findOne(this.user)
    sendEmail(usr!.email, apiCompareRequest).catch(console.error)
  }
}