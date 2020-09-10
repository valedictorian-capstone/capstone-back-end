import { Controller, Get, HttpException, HttpStatus, Inject, Body, Post, Put, Param, Delete } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AccountRoleService } from 'src/app/services';
import { IAccountRoleController } from 'src/app/interfaces';
import { AccountRoleVM, AccountRoleCM, AccountRoleUM } from 'src/app/dtos';
import { Sequelize } from 'sequelize-typescript';

@ApiBearerAuth('JWT')
@ApiTags('AccountRole')
@Controller('/api/v1/AccountRole')
export class AccountRoleController implements IAccountRoleController {
    constructor(
        protected readonly accountRoleService: AccountRoleService,
        @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all accountRoles' })
    @ApiOkResponse({description: 'Success return all accountRoles'})
    @ApiBadRequestResponse({ description: 'Have error in run time'})
    public async findAll(): Promise<AccountRoleVM[]> {
        return await this.accountRoleService
            .findAll({}, [])
            .then(accountRoles =>
                accountRoles.map(
                    accountRole =>
                        new AccountRoleVM({
                            Id: accountRole.Id,
                            AccountId: accountRole.AccountId,
                            RoleId: accountRole.RoleId,
                            IsDelete: accountRole.IsDelete,
                            CreatedAt: accountRole.CreatedAt,
                            UpdatedAt: accountRole.UpdatedAt
                        }),
                ),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [findAll function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an accountRole by Id' })
    @ApiOkResponse({description: 'Success return an accountRole\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find accountRole by Id'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findById(@Param('id') id: string): Promise<AccountRoleVM> {
        return await this.accountRoleService
            .findById({ Id: id }, [])
            .then(accountRole => {
                if (accountRole !== null) {
                    return new AccountRoleVM({
                        Id: accountRole.Id,
                        AccountId: accountRole.AccountId,
                        RoleId: accountRole.RoleId,
                        IsDelete: accountRole.IsDelete,
                        CreatedAt: accountRole.CreatedAt,
                        UpdatedAt: accountRole.UpdatedAt
                    });
                } else {
                    throw new HttpException(
                        'Can not find information of ' + id,
                        HttpStatus.NOT_FOUND,
                    );
                }
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Post()
    @ApiOperation({ summary: 'Insert new accountRole' })
    @ApiCreatedResponse({description: 'Success create new accountRole'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async insert(@Body() body: AccountRoleCM): Promise<AccountRoleVM> {
        return await this.accountRoleService
            .insert({ ...body as any })
            .then(
                accountRole =>
                    new AccountRoleVM({
                        Id: accountRole.Id,
                        AccountId: accountRole.AccountId,
                        RoleId: accountRole.RoleId,
                        IsDelete: accountRole.IsDelete,
                        CreatedAt: accountRole.CreatedAt,
                        UpdatedAt: accountRole.UpdatedAt
                    }),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [insert function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update an accountRole by Id' })
    @ApiCreatedResponse({description: 'Success update new accountRole'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async update(@Body() body: AccountRoleUM): Promise<AccountRoleVM> {
        return await this.findById(body.Id).then(async () => {
            return await this.accountRoleService
            .update(body as any, { Id: body.Id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${body.Id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [update function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
        })
        .catch(e => {
            throw new HttpException(
                'Error at [AccountRoleController] [update function] with [message]: ' +
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an accountRole by Id' })
    @ApiCreatedResponse({description: 'Success delete new accountRole'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async remove(id: string): Promise<AccountRoleVM> {
        return await this.accountRoleService
            .remove({ Id: id })
            .then(() => {
                throw new HttpException(
                    `Remove information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [remove function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an accountRole by Id' })
    @ApiCreatedResponse({description: 'Success active new accountRole'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async active(id: string): Promise<AccountRoleVM> {
        return await this.accountRoleService
            .update({ IsDelete: false } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [active function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an accountRole by Id' })
    @ApiCreatedResponse({description: 'Success deactive new accountRole'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async deactive(id: string): Promise<AccountRoleVM> {
        return await this.accountRoleService
            .update({ IsDelete: true } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountRoleController] [deactive function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }
}
