import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column({ unique: true, nullable: false })
  description: string;
  @Column({ type: 'double precision', nullable: false })
  price: number;
  @Column({ type: 'bool', default: true })
  status: boolean;
  @Column({ nullable: false })
  image: string;
  @ManyToOne(() => Category, (category) => category.foods, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => Order, (order) => order.food)
  orders: Order[];
}
