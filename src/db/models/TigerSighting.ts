import { Field, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Geometry } from 'geojson'
//import { PointObject } from 'graphql-geojson'

import { Tiger } from './Tiger'
//import { PointType } from '../../graphql/inputs/PointType'

@ObjectType()
@Entity('tiger_sightings')
export class TigerSighting {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /** TODO: Fix type issue for location */
  // @Field((_type) => PointType)
  @Column({ type: 'point' })
  public location!: Geometry

  @Field()
  @Column({ type: 'varchar', name: 'image_url', nullable: true })
  public imageURL!: string

  @Field((_type) => Date)
  @Column({ name: 'last_seen_at' })
  public lastSeenAt!: Date

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date

  @Field()
  @CreateDateColumn({ name: 'updated_at' })
  public updatedAt!: Date

  @Field((_type) => Tiger)
  @ManyToOne((_type) => Tiger, (tiger: Tiger) => tiger.id)
  @JoinColumn({ name: 'tiger_id' })
  public tiger!: Tiger
}
