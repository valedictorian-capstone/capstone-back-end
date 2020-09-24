import { AutoMap } from "nestjsx-automapper";
import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";
import { CustomerVM } from "./customer.view-model";

export class CustomerExtraInformationVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly name: string;
  
  @AutoMap()
  public readonly customerId: string;
  
  @AutoMap()
  public readonly type: string;
  
  @AutoMap()
  public readonly subType: string;
  
  @AutoMap()
  public readonly options: string;
  
  @AutoMap()
  public readonly placeHolder: string;
  
  @AutoMap()
  public readonly tooltip: string;
  
  public readonly customer: CustomerVM;


  public readonly customerExtraInformationDatas: CustomerExtraInformationDataVM[];
    
  @AutoMap()
  public readonly isDelete: boolean;
  
  @AutoMap()
  public readonly createdBy: string;
  
  @AutoMap()
  public readonly updatedBy: string;
  
  @AutoMap()
  public readonly createdAt: Date;
  
  @AutoMap()
  public readonly updatedAt: Date;
}

export class CustomerExtraInformationCM {
  public readonly name: string;
  public readonly customerId: string;
  public readonly type: string;
  public readonly subType: string;
  public readonly options: string;
  public readonly placeHolder: string;
  public readonly tooltip: string;
}

export class CustomerExtraInformationUM {
  public readonly id: string;
  public readonly name: string;
  public readonly customerId: string;
  public readonly type: string;
  public readonly subType: string;
  public readonly options: string;
  public readonly placeHolder: string;
  public readonly tooltip: string;
}