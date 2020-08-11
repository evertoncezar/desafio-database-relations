import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {
    this.customersRepository = customersRepository;
  }

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const checkCustomerExist = await this.customersRepository.findByEmail(
      email,
    );

    if (checkCustomerExist) {
      throw new AppError('Customer Email address already used!');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
