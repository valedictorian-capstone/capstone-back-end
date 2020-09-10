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
import { WorkFlowInstanceService } from 'src/app/services';
import { IWorkFlowInstanceController } from 'src/app/interfaces';
import { WorkFlowInstanceVM, WorkFlowInstanceCM, WorkFlowInstanceUM } from 'src/app/dtos';
import { Sequelize } from 'sequelize-typescript';
import { WorkFlowConnection } from 'src/app/models';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowInstance')
@Controller('/api/v1/WorkFlowInstance')
export class WorkFlowInstanceController implements IWorkFlowInstanceController {
    constructor(
        protected readonly workFlowInstanceService: WorkFlowInstanceService,
        @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all workFlowInstances' })
    @ApiOkResponse({description: 'Success return all workFlowInstances'})
    @ApiBadRequestResponse({ description: 'Have error in run time'})
    public async findAll(): Promise<WorkFlowInstanceVM[]> {
        return await this.workFlowInstanceService
            .findAll({}, [this.sequelize.getRepository(WorkFlowConnection)])
            .then(workFlowInstances =>
                workFlowInstances.map(
                    workFlowInstance =>
                        new WorkFlowInstanceVM({
                            Id: workFlowInstance.Id,
                            Name: workFlowInstance.Name,
                            WorkFlowId: workFlowInstance.WorkFlowId,
                            Description: workFlowInstance.Description,
                            IsDelete: workFlowInstance.IsDelete,
                            CreatedAt: workFlowInstance.CreatedAt,
                            UpdatedAt: workFlowInstance.UpdatedAt
                        }),
                ),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowInstanceController] [findAll function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an workFlowInstance by Id' })
    @ApiOkResponse({description: 'Success return an workFlowInstance\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find workFlowInstance by Id'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findById(@Param('id') id: string): Promise<WorkFlowInstanceVM> {
        return await this.workFlowInstanceService
            .findById({ Id: id }, [this.sequelize.getRepository(WorkFlowConnection)])
            .then(workFlowInstance => {
                if (workFlowInstance !== null) {
                    return new WorkFlowInstanceVM({
                        Id: workFlowInstance.Id,
                            Name: workFlowInstance.Name,
                            Description: workFlowInstance.Description,
                            WorkFlowId: workFlowInstance.WorkFlowId,
                            IsDelete: workFlowInstance.IsDelete,
                            CreatedAt: workFlowInstance.CreatedAt,
                            UpdatedAt: workFlowInstance.UpdatedAt
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
                    'Error at [WorkFlowInstanceController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Post()
    @ApiOperation({ summary: 'Insert new workFlowInstance' })
    @ApiCreatedResponse({description: 'Success create new workFlowInstance'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async insert(@Body() body: WorkFlowInstanceCM): Promise<WorkFlowInstanceVM> {
        return await this.workFlowInstanceService
            .insert({ ...body as any })
            .then(
                workFlowInstance =>
                    new WorkFlowInstanceVM({
                        Id: workFlowInstance.Id,
                        Name: workFlowInstance.Name,
                        Description: workFlowInstance.Description,
                        WorkFlowId: workFlowInstance.WorkFlowId,
                        IsDelete: workFlowInstance.IsDelete,
                        CreatedAt: workFlowInstance.CreatedAt,
                        UpdatedAt: workFlowInstance.UpdatedAt
                    }),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowInstanceController] [insert function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update an workFlowInstance by Id' })
    @ApiCreatedResponse({description: 'Success update new workFlowInstance'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async update(@Body() body: WorkFlowInstanceUM): Promise<WorkFlowInstanceVM> {
        return await this.findById(body.Id).then(async () => {
            return await this.workFlowInstanceService
            .update(body as any, { Id: body.Id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${body.Id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowInstanceController] [update function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
        })
        .catch(e => {
            throw new HttpException(
                'Error at [WorkFlowInstanceController] [update function] with [message]: ' +
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an workFlowInstance by Id' })
    @ApiCreatedResponse({description: 'Success delete new workFlowInstance'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async remove(id: string): Promise<WorkFlowInstanceVM> {
        return await this.workFlowInstanceService
            .remove({ Id: id })
            .then(() => {
                throw new HttpException(
                    `Remove information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowInstanceController] [remove function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an workFlowInstance by Id' })
    @ApiCreatedResponse({description: 'Success active new workFlowInstance'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async active(id: string): Promise<WorkFlowInstanceVM> {
        return await this.workFlowInstanceService
            .update({ IsDelete: false } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowInstanceController] [active function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an workFlowInstance by Id' })
    @ApiCreatedResponse({description: 'Success deactive new workFlowInstance'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async deactive(id: string): Promise<WorkFlowInstanceVM> {
        return await this.workFlowInstanceService
            .update({ IsDelete: true } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowInstanceController] [deactive function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }
}
