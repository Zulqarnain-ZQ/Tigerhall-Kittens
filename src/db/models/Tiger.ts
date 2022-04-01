import { Field, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'

import { TigerSighting } from './TigerSighting'

@ObjectType()
@Entity('tigers')
export class Tiger {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number

  @Field()
  @Column({ type: 'varchar' })
  public name!: string

  @Field()
  @Column({ type: 'date', name: 'date_of_birth' })
  public dateOfBirth!: Date

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date

  @Field()
  @CreateDateColumn({ name: 'updated_at' })
  public updatedAt!: Date

  @Field((_type) => [TigerSighting])
  @OneToMany(
    (_type) => TigerSighting,
    (product: TigerSighting) => product.tiger
  )
  public sightings?: TigerSighting[]
}
