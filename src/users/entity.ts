import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, AfterInsert, } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNotEmpty, IsEmail, MinLength, } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Idea from '../ideas/entity';
import Upload from '../files/entity';
import sendEmail from '../emails/sendEmail'
import { registrationEmail } from '../emails/emailOptions'
import AutoMatch from '../api/entity';

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  EXPERT = "expert"
}

@Entity()
export default class User extends BaseEntity {

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }


  @PrimaryGeneratedColumn()
  id?: number

  @IsNotEmpty()
  @IsString()
  @Column('text', { nullable: false })
  firstName: string

  @IsNotEmpty()
  @IsString()
  @Column('text', { nullable: false })
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  @Column('text', { nullable: false })
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole

  @Column('text', { nullable: true })
  industry: string

  @Column('text', { nullable: true })
  country: string

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @OneToMany(_type => Idea, ideas => ideas.user, { nullable: true, onDelete: 'CASCADE', })
  ideas: Idea[];

  @OneToMany(_type => AutoMatch, autoMatch => autoMatch.user, { nullable: true, onDelete: 'CASCADE', })
  autoMatch: AutoMatch[];

  @OneToMany(_type => Upload, uploads => uploads.user, { nullable: true })
  uploads: Upload[];


  @AfterInsert()
  sendEmail() {
    sendEmail(this.email, registrationEmail).catch(console.error)
  }
}
