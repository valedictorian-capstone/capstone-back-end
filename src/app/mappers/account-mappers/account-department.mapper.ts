
import { AccountDepartment } from '@models';
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { AccountDepartmentUM, AccountDepartmentVM, AccountVM, DepartmentVM } from '@view-models';

export class AccountDepartmentMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(AccountDepartment, AccountDepartmentVM)
            .forMember(d => d.account, mapWith(AccountVM, s => s.account))
            .forMember(d => d.department, mapWith(DepartmentVM, s => s.department));
        mapper.createMap(AccountDepartmentUM, AccountDepartmentVM);
    }

}