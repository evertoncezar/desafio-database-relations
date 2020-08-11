import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository;
  }

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkProductExist = await this.productsRepository.findByName(name);

    if (checkProductExist) {
      throw new AppError('Product Name already used!');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
