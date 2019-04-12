import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne, AfterInsert } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Idea from '../ideas/entity';
// import { apiCompareRequest } from '../emails/emailOptions';
// import sendEmail from '../emails/sendEmail';
import User from '../users/entity';
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

  @AfterInsert()
  async checkIdea() {
    const usr = await User.findOne(this.idea.user)
    console.log('MYUSERFROMAPI',usr)
    // sendEmail(usr!.email, apiCompareRequest).catch(console.error)
  }
}