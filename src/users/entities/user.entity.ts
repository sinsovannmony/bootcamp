import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role.enum';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  fullname: string;
  @Column({ nullable: false })
  password: string;
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
  @Column({ type: 'bool', default: true })
  status: boolean;
  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    const roundes = 10;
    this.password = await bcrypt.hash(this.password, roundes);
  }
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
