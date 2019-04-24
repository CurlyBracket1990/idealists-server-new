import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Survey from '../surveys/entity';
import Question from '../questions/entity'

@Entity()
export default class Group extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_type => Survey, survey => survey.groups)
  survey: Survey;

  @OneToMany(_type => Question, questions => questions.group, { eager: true })
  questions: Question[];
}