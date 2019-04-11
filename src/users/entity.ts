import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, AfterInsert, } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNotEmpty, IsEmail, MinLength, } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Idea from '../ideas/entity';
import Upload from '../files/entity';
import sendEmail from '../emails/sendEmail'

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

  @OneToMany(_type => Idea, ideas => ideas.user, { eager: true, nullable: true })
  ideas: Idea[];

  @OneToMany(_type => Upload, uploads => uploads.user, { eager: true, nullable: true })
  uploads: Upload[];

  registrationEmail = {
    receivers: this.email, // list of receivers
    subject: `Idealists Registration`, // Subject line
    plainBody: `Congratulation, you are now registered with Idealists`, // plain text body
    htmlBody: `Congratulation, you are now registered with Idealists`, // html body}
  }

  @AfterInsert()
  sendEmail() {
    sendEmail(this.registrationEmail).catch(console.error)
  }
}