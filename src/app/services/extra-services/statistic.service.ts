import { AppGateway } from "@extras/gateways";
import { Deal, Group, Product } from "@models";
import { Inject, Injectable } from "@nestjs/common";
import { CustomerRepository, DealRepository, GroupRepository, ProductRepository } from "@repositories";
import { CUSTOMER_REPOSITORY, DEAL_REPOSITORY, GROUP_REPOSITORY, PRODUCT_REPOSITORY } from "@types";
import { CustomerVM, DealVM, GroupVM, ProductVM } from '@view-models';
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class StatisticService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    protected readonly gateway: AppGateway
  ) {

  }

  public readonly getCustomerInMonth = async (month: number, year: number): Promise<{ id: string, name: string, data: CustomerVM[] }[]> => {
    return await this.groupRepository.useHTTP().find({ relations: ['customers'] }).then((groups) => {
      return groups.map((group) => {
        const vm = this.mapper.map(group, GroupVM, Group);
        const data = vm.customers.filter((customer) => {
          const createdAt = new Date(customer.createdAt);
          return createdAt.getFullYear() == year && createdAt.getMonth() == month;
        });
        this.gateway.server.emit('customer-in-month', {
          id: vm.id,
          name: vm.name,
          data
        });
        return {
          id: vm.id,
          name: vm.name,
          data
        };
      });
    });
  }
  public readonly getCustomerInYear = async (year: number): Promise<{ id: string, name: string, data: Array<CustomerVM[]> }[]> => {
    return await this.groupRepository.useHTTP().find({ relations: ['customers'] }).then((groups) => {
      return groups.map((group) => {
        const vm = this.mapper.map(group, GroupVM, Group);
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => vm.customers.filter((customer) => {
          const createdAt = new Date(customer.createdAt);
          return createdAt.getFullYear() == year && createdAt.getMonth() == month;
        }));
        this.gateway.server.emit('customer-in-year', {
          id: vm.id,
          name: vm.name,
          data
        });
        return {
          id: vm.id,
          name: vm.name,
          data
        };
      });
    });
  }
  public readonly getDealInMonth = async (month: number, year: number): Promise<{ status: string, data: DealVM[] }[]> => {
    return await this.dealRepository.useHTTP().find().then((deals) => {
      const vms = this.mapper.mapArray(deals, DealVM, Deal);
      return ['Processing', 'Won', 'Lost'].map((status) => {
        const data = vms.filter((deal) => {
          const createdAt = new Date(deal.createdAt);
          return createdAt.getFullYear() == year && createdAt.getMonth() == month && deal.status.toLowerCase() === status.toLowerCase();
        });
        this.gateway.server.emit('deal-in-month', {
          status,
          data
        });
        return {
          status,
          data
        }
      });
    });
  }
  public readonly getDealInYear = async (year: number): Promise<{ status: string, data: Array<DealVM[]> }[]> => {
    return await this.dealRepository.useHTTP().find().then((deals) => {
      const vms = this.mapper.mapArray(deals, DealVM, Deal);
      return ['Processing', 'Won', 'Lost'].map((status) => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => vms.filter((deal) => {
          const createdAt = new Date(deal.createdAt);
          return createdAt.getFullYear() == year && createdAt.getMonth() == month && deal.status.toLowerCase() === status.toLowerCase();
        }));
        this.gateway.server.emit('deal-in-year', {
          status,
          data
        });
        return {
          status,
          data
        }
      });
    });
  }
  public readonly getTopRatingProduct = async (): Promise<ProductVM[]> => {
    return await this.productRepository.useHTTP().find({ relations: ['comments'] }).then((products) => {
      const rs = products.filter((product) => {
        const calculate = ((
          (1 * product.comments.filter((e) => e.rating === 1).length) +
          (2 * product.comments.filter((e) => e.rating === 2).length) +
          (3 * product.comments.filter((e) => e.rating === 3).length) +
          (4 * product.comments.filter((e) => e.rating === 4).length) +
          (5 * product.comments.filter((e) => e.rating === 5).length)
        ) / product.comments.length).toFixed(2);
        return parseInt(calculate, 0) > 0;
      }).sort((a, b) => {
        return parseInt(((
          (1 * b.comments.filter((e) => e.rating === 1).length) +
          (2 * b.comments.filter((e) => e.rating === 2).length) +
          (3 * b.comments.filter((e) => e.rating === 3).length) +
          (4 * b.comments.filter((e) => e.rating === 4).length) +
          (5 * b.comments.filter((e) => e.rating === 5).length)
        ) / a.comments.length).toFixed(2), 0) - parseInt(((
          (1 * a.comments.filter((e) => e.rating === 1).length) +
          (2 * a.comments.filter((e) => e.rating === 2).length) +
          (3 * a.comments.filter((e) => e.rating === 3).length) +
          (4 * a.comments.filter((e) => e.rating === 4).length) +
          (5 * a.comments.filter((e) => e.rating === 5).length)
        ) / a.comments.length).toFixed(2), 0);
      });
      this.gateway.server.emit('top-product', this.mapper.mapArray(rs.length > 9 ? rs.slice(0, 9) : rs, ProductVM, Product));
      return this.mapper.mapArray(rs.length > 9 ? rs.slice(0, 9) : rs, ProductVM, Product);
    });
  }
}