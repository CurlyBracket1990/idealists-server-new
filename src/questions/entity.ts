import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNotEmpty } from 'class-validator'
import Group from '../groups/entity';
// import Answer from '../answers/entity';

export enum QuestionType {
  MULTILINE = 'multiLine',
  SINGLELINE = 'singleLine',
  SINGLECHOICE = 'singleChoice',
  MULTICHOICE = 'multiChoice',
  FATAL = 'fatal',
}


@Entity()
export default class Question extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_type => Group, group => group.questions)
  group: Group

  @IsNotEmpty()
  @IsString()
  @Column('text', { nullable: false })
  question: string

  @Column('text', { nullable: true })
  validation: string

  @Column({
    type: 'enum',
    enum: QuestionType,
    nullable: true
  })
  type: QuestionType

}