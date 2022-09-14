import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Rating])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
