import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, AfterInsert } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsNotEmpty, } from 'class-validator'
import User from '../users/entity';
import apiCheck from '../api/apiCheck';
import sendEmail from '../emails/sendEmail';
import { ideaConfirmation } from '../emails/emailOptions';



@Entity()
export default class Idea extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNotEmpty()
  @Column('jsonb', { nullable: true })
  idea: JSON

  @ManyToOne(_type => User, user => user.ideas)
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @AfterInsert()
  async checkIdea() {
    apiCheck(this.idea)
    const usr = await User.findOne(this.user)
    sendEmail(usr!.email, ideaConfirmation).catch(console.error)
  }
}