import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async create(rating: Rating) {
    return this.ratingRepository.save(rating);
  }

  findAll() {
    return this.ratingRepository.find();
  }

  findOne(id: number) {
    return this.ratingRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.ratingRepository.delete(id);
  }
}
