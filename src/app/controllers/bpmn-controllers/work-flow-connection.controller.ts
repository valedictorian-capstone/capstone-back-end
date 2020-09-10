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
import { WorkFlowConnectionService } from 'src/app/services';
import { IWorkFlowConnectionController } from 'src/app/interfaces';
import { WorkFlowConnectionVM, WorkFlowConnectionCM, WorkFlowConnectionUM } from 'src/app/dtos';
import { Sequelize } from 'sequelize-typescript';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowConnection')
@Controller('/api/v1/WorkFlowConnection')
export class WorkFlowConnectionController implements IWorkFlowConnectionController {
    constructor(
        protected readonly workFlowConnectionService: WorkFlowConnectionService,
        @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all workFlowConnections' })
    @ApiOkResponse({description: 'Success return all workFlowConnections'})
    @ApiBadRequestResponse({ description: 'Have error in run time'})
    public async findAll(): Promise<WorkFlowConnectionVM[]> {
        return await this.workFlowConnectionService
            .findAll({}, [])
            .then(workFlowConnections =>
                workFlowConnections.map(
                    workFlowConnection =>
                        new WorkFlowConnectionVM({
                            Id: workFlowConnection.Id,
                            Type: workFlowConnection.Type,
                            Description: workFlowConnection.Description,
                            FromWorkFlowInstanceId: workFlowConnection.FromWorkFlowInstanceId,
                            ToWorkFlowInstanceId: workFlowConnection.ToWorkFlowInstanceId,
                            IsDelete: workFlowConnection.IsDelete,
                            CreatedAt: workFlowConnection.CreatedAt,
                            UpdatedAt: workFlowConnection.UpdatedAt
                        }),
                ),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowConnectionController] [findAll function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an workFlowConnection by Id' })
    @ApiOkResponse({description: 'Success return an workFlowConnection\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find workFlowConnection by Id'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findById(@Param('id') id: string): Promise<WorkFlowConnectionVM> {
        return await this.workFlowConnectionService
            .findById({ Id: id }, [])
            .then(workFlowConnection => {
                if (workFlowConnection !== null) {
                    return new WorkFlowConnectionVM({
                        Id: workFlowConnection.Id,
                            Type: workFlowConnection.Type,
                            Description: workFlowConnection.Description,
                            FromWorkFlowInstanceId: workFlowConnection.FromWorkFlowInstanceId,
                            ToWorkFlowInstanceId: workFlowConnection.ToWorkFlowInstanceId,
                            IsDelete: workFlowConnection.IsDelete,
                            CreatedAt: workFlowConnection.CreatedAt,
                            UpdatedAt: workFlowConnection.UpdatedAt
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
                    'Error at [WorkFlowConnectionController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Post()
    @ApiOperation({ summary: 'Insert new workFlowConnection' })
    @ApiCreatedResponse({description: 'Success create new workFlowConnection'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async insert(@Body() body: WorkFlowConnectionCM): Promise<WorkFlowConnectionVM> {
        return await this.workFlowConnectionService
            .insert({ ...body as any })
            .then(
                workFlowConnection =>
                    new WorkFlowConnectionVM({
                        Id: workFlowConnection.Id,
                        Type: workFlowConnection.Type,
                        Description: workFlowConnection.Description,
                        FromWorkFlowInstanceId: workFlowConnection.FromWorkFlowInstanceId,
                        ToWorkFlowInstanceId: workFlowConnection.ToWorkFlowInstanceId,
                        IsDelete: workFlowConnection.IsDelete,
                        CreatedAt: workFlowConnection.CreatedAt,
                        UpdatedAt: workFlowConnection.UpdatedAt
                    }),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowConnectionController] [insert function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update an workFlowConnection by Id' })
    @ApiCreatedResponse({description: 'Success update new workFlowConnection'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async update(@Body() body: WorkFlowConnectionUM): Promise<WorkFlowConnectionVM> {
        return await this.findById(body.Id).then(async () => {
            return await this.workFlowConnectionService
            .update(body as any, { Id: body.Id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${body.Id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowConnectionController] [update function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
        })
        .catch(e => {
            throw new HttpException(
                'Error at [WorkFlowConnectionController] [update function] with [message]: ' +
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an workFlowConnection by Id' })
    @ApiCreatedResponse({description: 'Success delete new workFlowConnection'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async remove(id: string): Promise<WorkFlowConnectionVM> {
        return await this.workFlowConnectionService
            .remove({ Id: id })
            .then(() => {
                throw new HttpException(
                    `Remove information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowConnectionController] [remove function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an workFlowConnection by Id' })
    @ApiCreatedResponse({description: 'Success active new workFlowConnection'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async active(id: string): Promise<WorkFlowConnectionVM> {
        return await this.workFlowConnectionService
            .update({ IsDelete: false } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowConnectionController] [active function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an workFlowConnection by Id' })
    @ApiCreatedResponse({description: 'Success deactive new workFlowConnection'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async deactive(id: string): Promise<WorkFlowConnectionVM> {
        return await this.workFlowConnectionService
            .update({ IsDelete: true } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowConnectionController] [deactive function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }
}
