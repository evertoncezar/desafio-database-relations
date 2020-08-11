import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository;
  }

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ShowProductService;
