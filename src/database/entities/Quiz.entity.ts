import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('quiz')
export class Quiz {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  public id: number;

  @Column({ name: 'question', type: 'varchar', length: 3000})
  public question: string;

  @Column({ name: 'answer', type: 'varchar', length: 1})
  public answer: string;

  @Column({ name: 'choiceA', type: 'varchar', length: 3000})
  public choiceA: string;

  @Column({ name: 'choiceB', type: 'varchar', length: 3000})
  public choiceB: string;

  @Column({ name: 'choiceC', type: 'varchar', length: 3000})
  public choiceC: string;

  @Column({ name: 'choiceD', type: 'varchar', length: 3000})
  public choiceD: string;
  
  @Column({ name: 'qGroupId', type: 'int'})
  public qGroupId: number;

  @Column({ name: 'created_at', type: 'bigint', nullable: true })
  public createdAt: number;

  @Column({ name: 'updated_at', type: 'bigint', nullable: true })
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