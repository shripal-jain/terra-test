import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { ProductService } from 'src/product/product.service';

@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  @Patch()
  async create(@Body() rating: Rating) {
    let savedRating = await this.ratingService.create(rating);
    //Cumulative Avg Rating (To avoid heavy queries)
    //In future can be updated in an event driven fashion
    await this.productService.updateRating(
      savedRating.rating,
      savedRating.productId,
    );
    return savedRating;
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
