import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1648809581134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE tigers (
	    id serial PRIMARY KEY,
	    name VARCHAR ( 100 ) NOT NULL,
	    date_of_birth DATE NOT NULL,
	    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`)

    await queryRunner.query(`CREATE TABLE tiger_sightings  (
	    id serial PRIMARY KEY,
	    location point NOT NULL,
	    image_url VARCHAR ( 255 ) NOT NULL,
	    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      tiger_id serial NOT NULL
    );`)

    await queryRunner.query(
      `CREATE INDEX idx_tiger_id ON tiger_sightings(tiger_id)`
    )

    await queryRunner.query(
      `ALTER TABLE tiger_sightings
    ADD CONSTRAINT fk_tiger_id FOREIGN KEY (tiger_id) REFERENCES tigers(id);`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE tiger_sightings;
    DROP TABLE tigers;
    `)
  }
}
