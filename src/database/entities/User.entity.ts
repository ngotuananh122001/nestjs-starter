import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Index } from 'typeorm';

@Entity('user')
@Index('email', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  public id: number;

  @Column({ name: 'email', type: 'varchar', length: 191, nullable: false, unique: true })
  public email: string;
  
  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  public password: string;

  @Column({ name: 'fullName', type: 'varchar', length: 80, nullable: true })
  public fullName: string;

  @Column({ name: 'contact', type: 'varchar', length: 80, nullable: true })
  public contact: string;

  @Column({ name: 'avatarUrl', type: 'varchar', length: 255, nullable: true })
  public avatarUrl: string;

  @Column({ name: 'status', type: 'varchar', length: 255, nullable: true })
  public status: string;

  @Column({ name: 'roleId', type: 'int', nullable: true })
  public roleId: number;

  @Column({ name: 'createdAt', type: 'bigint', nullable: true })
  public createdAt: number;

  @Column({ name: 'updatedAt', type: 'bigint', nullable: true })
  public updatedAt: number;

  @BeforeInsert()
  public updateCreateDates() {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  @BeforeUpdate()
  public updateUpdateDates() {
    this.updatedAt = Date.now();
  }
}
