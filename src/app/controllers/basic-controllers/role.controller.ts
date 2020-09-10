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
import { RoleService } from 'src/app/services';
import { IRoleController } from 'src/app/interfaces';
import { RoleVM, RoleCM, RoleUM } from 'src/app/dtos';
import { Sequelize } from 'sequelize-typescript';

@ApiBearerAuth('JWT')
@ApiTags('Role')
@Controller('/api/v1/Role')
export class RoleController implements IRoleController {
    constructor(
        protected readonly roleService: RoleService,
        @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiOkResponse({description: 'Success return all roles'})
    @ApiBadRequestResponse({ description: 'Have error in run time'})
    public async findAll(): Promise<RoleVM[]> {
        return await this.roleService
            .findAll({}, [])
            .then(roles =>
                roles.map(
                    role =>
                        new RoleVM({
                            Id: role.Id,
                            Name: role.Name,
                            IsDelete: role.IsDelete,
                            CreatedAt: role.CreatedAt,
                            UpdatedAt: role.UpdatedAt
                        }),
                ),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [RoleController] [findAll function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an role by Id' })
    @ApiOkResponse({description: 'Success return an role\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find role by Id'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findById(@Param('id') id: string): Promise<RoleVM> {
        return await this.roleService
            .findById({ Id: id }, [])
            .then(role => {
                if (role !== null) {
                    return new RoleVM({
                        Id: role.Id,
                            Name: role.Name,
                            IsDelete: role.IsDelete,
                            CreatedAt: role.CreatedAt,
                            UpdatedAt: role.UpdatedAt
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
                    'Error at [RoleController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Post()
    @ApiOperation({ summary: 'Insert new role' })
    @ApiCreatedResponse({description: 'Success create new role'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async insert(@Body() body: RoleCM): Promise<RoleVM> {
        return await this.roleService
            .insert({ ...body as any })
            .then(
                role =>
                    new RoleVM({
                        Id: role.Id,
                        Name: role.Name,
                        IsDelete: role.IsDelete,
                        CreatedAt: role.CreatedAt,
                        UpdatedAt: role.UpdatedAt
                    }),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [RoleController] [insert function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update an role by Id' })
    @ApiCreatedResponse({description: 'Success update new role'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async update(@Body() body: RoleUM): Promise<RoleVM> {
        return await this.findById(body.Id).then(async () => {
            return await this.roleService
            .update(body as any, { Id: body.Id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${body.Id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [RoleController] [update function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
        })
        .catch(e => {
            throw new HttpException(
                'Error at [RoleController] [update function] with [message]: ' +
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an role by Id' })
    @ApiCreatedResponse({description: 'Success delete new role'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async remove(id: string): Promise<RoleVM> {
        return await this.roleService
            .remove({ Id: id })
            .then(() => {
                throw new HttpException(
                    `Remove information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [RoleController] [remove function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an role by Id' })
    @ApiCreatedResponse({description: 'Success active new role'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async active(id: string): Promise<RoleVM> {
        return await this.roleService
            .update({ IsDelete: false } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [RoleController] [active function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an role by Id' })
    @ApiCreatedResponse({description: 'Success deactive new role'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async deactive(id: string): Promise<RoleVM> {
        return await this.roleService
            .update({ IsDelete: true } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [RoleController] [deactive function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }
}
