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
import { hashSync } from 'bcrypt'
import { AccountService } from 'src/app/services';
import { IAccountController } from 'src/app/interfaces';
import { AccountVM, AccountCM, AccountUM } from 'src/app/dtos';
import { Sequelize } from 'sequelize-typescript';
import { AccountRole } from 'src/app/models';

@ApiBearerAuth('JWT')
@ApiTags('Account')
@Controller('/api/v1/Account')
export class AccountController implements IAccountController {
    constructor(
        protected readonly accountService: AccountService,
        @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all accounts' })
    @ApiOkResponse({description: 'Success return all accounts'})
    @ApiBadRequestResponse({ description: 'Have error in run time'})
    public async findAll(): Promise<AccountVM[]> {
        return await this.accountService
            .findAll({}, [this.sequelize.getRepository(AccountRole)])
            .then(accounts =>
                accounts.map(
                    account =>
                        new AccountVM({
                            Id: account.Id,
                            Email: account.Email,
                            Fullname: account.Fullname,
                            Phone: account.Phone,
                            Username: account.Username,
                            IsDelete: account.IsDelete,
                            CreatedAt: account.CreatedAt,
                            UpdatedAt: account.UpdatedAt
                        }),
                ),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [findAll function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an account by Id' })
    @ApiOkResponse({description: 'Success return an account\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find account by Id'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findById(@Param('id') id: string): Promise<AccountVM> {
        return await this.accountService
            .findById({ Id: id }, [this.sequelize.getRepository(AccountRole)])
            .then(account => {
                if (account !== null) {
                    return new AccountVM({
                        Id: account.Id,
                        Email: account.Email,
                        Fullname: account.Fullname,
                        Phone: account.Phone,
                        Username: account.Username,
                        IsDelete: account.IsDelete,
                        CreatedAt: account.CreatedAt,
                        UpdatedAt: account.UpdatedAt
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
                    'Error at [AccountController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':username')
    @ApiOperation({ summary: 'Get an account by Username' })
    @ApiOkResponse({description: 'Success return an account\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find account by Username'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findByUsername(@Param('username') username: string): Promise<AccountVM> {
        return await this.accountService
            .findById({ Username: username }, [this.sequelize.getRepository(AccountRole)])
            .then(account => {
                if (account !== null) {
                    return new AccountVM({
                        Id: account.Id,
                        Email: account.Email,
                        Fullname: account.Fullname,
                        Phone: account.Phone,
                        Username: account.Username,
                        IsDelete: account.IsDelete,
                        CreatedAt: account.CreatedAt,
                        UpdatedAt: account.UpdatedAt
                    });
                } else {
                    throw new HttpException(
                        'Can not find information of ' + username,
                        HttpStatus.NOT_FOUND,
                    );
                }
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':email')
    @ApiOperation({ summary: 'Get an account by Email' })
    @ApiOkResponse({description: 'Success return an account\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find account by Email'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findByEmail(@Param('email') email: string): Promise<AccountVM> {
        return await this.accountService
            .findById({ Email: email }, [this.sequelize.getRepository(AccountRole)])
            .then(account => {
                if (account !== null) {
                    return new AccountVM({
                        Id: account.Id,
                        Email: account.Email,
                        Fullname: account.Fullname,
                        Phone: account.Phone,
                        Username: account.Username,
                        IsDelete: account.IsDelete,
                        CreatedAt: account.CreatedAt,
                        UpdatedAt: account.UpdatedAt
                    });
                } else {
                    throw new HttpException(
                        'Can not find information of ' + email,
                        HttpStatus.NOT_FOUND,
                    );
                }
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [findByEmail function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':phone')
    @ApiOperation({ summary: 'Get an account by Phone' })
    @ApiOkResponse({description: 'Success return an account\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find account by Phone'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findByPhone(@Param('phone') phone: string): Promise<AccountVM> {
        return await this.accountService
            .findById({ Phone: phone }, [this.sequelize.getRepository(AccountRole)])
            .then(account => {
                if (account !== null) {
                    return new AccountVM({
                        Id: account.Id,
                        Email: account.Email,
                        Fullname: account.Fullname,
                        Phone: account.Phone,
                        Username: account.Username,
                        IsDelete: account.IsDelete,
                        CreatedAt: account.CreatedAt,
                        UpdatedAt: account.UpdatedAt
                    });
                } else {
                    throw new HttpException(
                        'Can not find information of ' + phone,
                        HttpStatus.NOT_FOUND,
                    );
                }
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [findByPhone function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Post()
    @ApiOperation({ summary: 'Insert new account' })
    @ApiCreatedResponse({description: 'Success create new account'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async insert(@Body() body: AccountCM): Promise<AccountVM> {
        return await this.accountService
            .insert({ ...body as any, PasswordHash: hashSync(body.Password, 10) })
            .then(
                account =>
                    new AccountVM({
                        Id: account.Id,
                        Email: account.Email,
                        Fullname: account.Fullname,
                        Phone: account.Phone,
                        Username: account.Username,
                        IsDelete: account.IsDelete,
                        CreatedAt: account.CreatedAt,
                        UpdatedAt: account.UpdatedAt
                    }),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [insert function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update an account by Id' })
    @ApiCreatedResponse({description: 'Success update new account'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async update(@Body() body: AccountUM): Promise<AccountVM> {
        return await this.findById(body.Id).then(async () => {
            return await this.accountService
            .update(body as any, { Id: body.Id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${body.Id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [update function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
        })
        .catch(e => {
            throw new HttpException(
                'Error at [AccountController] [update function] with [message]: ' +
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an account by Id' })
    @ApiCreatedResponse({description: 'Success delete new account'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async remove(id: string): Promise<AccountVM> {
        return await this.accountService
            .remove({ Id: id })
            .then(() => {
                throw new HttpException(
                    `Remove information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [remove function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an account by Id' })
    @ApiCreatedResponse({description: 'Success active new account'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async active(id: string): Promise<AccountVM> {
        return await this.accountService
            .update({ IsDelete: false } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [active function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an account by Id' })
    @ApiCreatedResponse({description: 'Success deactive new account'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async deactive(id: string): Promise<AccountVM> {
        return await this.accountService
            .update({ IsDelete: true } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [AccountController] [deactive function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }
}
