import { Customer } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CustomerExtraInformationDataVM, CustomerUM, CustomerVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
      .forMember(d => d.customerExtraInformationDatas,
        preCondition((s) => s.customerExtraInformationDatas != null, []),
        mapWith(CustomerExtraInformationDataVM, s => s.customerExtraInformationDatas)
      )

    mapper.createMap(CustomerUM, CustomerVM);
  }
}