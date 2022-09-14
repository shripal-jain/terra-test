import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Query } from './dto/query.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //can be used as update
  create(product: Product) {
    return this.productRepository.save(product);
  }

  async findAll(query: Query): Promise<any> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.productRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      // order: { name: 'DESC' },
      take: take,
      skip: skip,
      order: {
        [query.sortField]: query.sortOrder === 'descend' ? 'DESC' : 'ASC',
      },
    });

    return {
      data: result,
      count: total,
    };
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  //This is called on adding rating in rating table
  async updateRating(rating: number, productId: number) {
    let avg_rating = -1;
    let rating_count = -1;
    let product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product.avg_rating) {
      avg_rating = 0;
      rating_count = 0;
    } else {
      avg_rating = product.avg_rating;
      rating_count = product.rating_count;
    }

    product.rating_count = rating_count + 1;
    product.avg_rating =
      (avg_rating * rating_count + rating) / (rating_count + 1);

    this.productRepository.save(product);
  }
}
