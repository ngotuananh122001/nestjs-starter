import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1673062513040 implements MigrationInterface {
    name = 'InitDatabase1673062513040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(191) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(80) NULL, \`contact\` varchar(80) NULL, \`avatarUrl\` varchar(255) NULL, \`status\` varchar(255) NULL, \`roleId\` int NULL, \`createdAt\` bigint NULL, \`updatedAt\` bigint NULL, UNIQUE INDEX \`email\` (\`email\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`question\` varchar(3000) NOT NULL, \`answer\` varchar(1) NOT NULL, \`choiceA\` varchar(3000) NOT NULL, \`choiceB\` varchar(3000) NOT NULL, \`choiceC\` varchar(3000) NOT NULL, \`choiceD\` varchar(3000) NOT NULL, \`qGroupId\` int NOT NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`quiz\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
