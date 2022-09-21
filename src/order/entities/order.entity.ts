import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from 'src/menu/entities/food.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'double precision', nullable: false })
  totalPrice: number;
  @ManyToOne(() => Food, (food) => food.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  food: Food;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
