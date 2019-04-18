// import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from 'typeorm'
// import { BaseEntity } from 'typeorm/repository/BaseEntity'
// import User from '../users/entity';


// @Entity()
// export default class Upload extends BaseEntity {

//   @PrimaryGeneratedColumn()
//   id?: number

//   @Column('text', { nullable: true })
//   path: string

//   @ManyToOne(_type => User, user => user.uploads)
//   user: User;

//   @CreateDateColumn({ type: "timestamp" })
//   createdAt: Date;

// }