import { Rating } from 'src/rating/entities/rating.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
    default: 0,
  })
  avg_rating: number;

  @Column({
    nullable: true,
    default: 0,
  })
  rating_count: number;

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];
}
