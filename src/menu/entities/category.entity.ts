import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from './food.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ nullable: false })
  description: string;
  @Column({ type: 'bool', default: true })
  status: boolean;
  @OneToMany(() => Food, (food) => food.category)
  foods: Food[];
}
