import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, AfterInsert, OneToOne, JoinColumn, } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsNotEmpty, } from 'class-validator'
import User from '../users/entity';
import AutoMatch from '../api/entity';
import Progress from '../progress/entity';
import { createEntry } from '../progress/updateProgress';
// import apiCheck from '../api/apiCheck';
// import sendEmail from '../emails/sendEmail';
// import { ideaConfirmation } from '../emails/emailOptions';


@Entity()
export default class Idea extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNotEmpty()
  @Column('jsonb', { nullable: true })
  idea: JSON

  @ManyToOne(_type => User, user => user.ideas, { eager: true })
  user: User;

  @OneToOne(_type => Progress, progress => progress.idea, { })
  @JoinColumn()
  progress: Progress;
  
  @OneToOne(_type => AutoMatch, automatch => automatch.idea, { })
  @JoinColumn()
  autoMatch: AutoMatch;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @AfterInsert()
  async checkIdea() {
    createEntry(this)
    // apiCheck(this.idea)
    // const usr = await User.findOne(this.user)
    // sendEmail(usr!.email, ideaConfirmation).catch(console.error)
  }
}