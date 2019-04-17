import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Idea from '../ideas/entity'

@Entity()
export default class Progress extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @OneToOne(_type => Idea, idea => idea.progress)
  idea: Idea;

  @Column('boolean', { nullable: false, default: false })
  step1: boolean
}