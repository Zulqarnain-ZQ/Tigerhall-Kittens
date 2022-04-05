import { Field, Float, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Tiger } from './Tiger'

@ObjectType()
class Point {
  @Field((_type) => Float)
  public lat!: number

  @Field((_type) => Float)
  public lon!: number
}

@ObjectType()
@Entity('tiger_sightings')
export class TigerSighting {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number

  @Field((_type) => Point)
  @Column({ type: 'json' })
  public location!: Point

  @Field({ nullable: true })
  @Column({ type: 'varchar', name: 'image_url', nullable: true })
  public imageURL!: string | null

  @Field((_type) => Date)
  @Column({ name: 'last_seen_at' })
  public lastSeenAt!: Date

  @Column({ name: 'tiger_id' })
  public tigerId: number

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
