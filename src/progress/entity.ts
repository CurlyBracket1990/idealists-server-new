import { Entity, PrimaryGeneratedColumn, OneToOne, Column, UpdateDateColumn, AfterUpdate } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Idea from '../ideas/entity'
import sendEmail from '../emails/sendEmail';
import User from '../users/entity';
import { ideaUpdate } from '../emails/emailOptions';

@Entity()
export default class Progress extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @OneToOne(_type => Idea, idea => idea.progress)
  idea: Idea;

  @UpdateDateColumn()
  updatedDate: Date;

  /* 
1.	Submit your idea
2.	First patent check
3.	Expert check
4.	Second patent check
5.	Validation phase
6.	Final patent check
7.	Business plan phase
8.	Build the team
9.	Funding phase
10.	Company is born
  */

  @Column({ default: true })
  step01: boolean;
  @Column({ default: false })
  step02: boolean;
  @Column({ default: false })
  step03: boolean;
  @Column({ default: false })
  step04: boolean;
  @Column({ default: false })
  step05: boolean;
  @Column({ default: false })
  step06: boolean;
  @Column({ default: false })
  step07: boolean;
  @Column({ default: false })
  step08: boolean;
  @Column({ default: false })
  step09: boolean;
  @Column({ default: false })
  step10: boolean;

  @AfterUpdate()
  async sendMail() {
    const usr = await User.findOne({where: this.idea})
    sendEmail(usr!.email, ideaUpdate).catch(console.error)
  }
}