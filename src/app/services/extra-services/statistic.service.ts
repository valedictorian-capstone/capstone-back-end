import { Deal, Group } from "@models";
import { Inject, Injectable } from "@nestjs/common";
import { CustomerRepository, DealRepository, GroupRepository, ProductRepository } from "@repositories";
import { CUSTOMER_REPOSITORY, DEAL_REPOSITORY, GROUP_REPOSITORY, PRODUCT_REPOSITORY } from "@types";
import { CustomerVM, DealVM, GroupVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class StatisticService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
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
        return {
          status,
          data
        }
      });
    });
  }
}