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
import { WorkFlowService } from 'src/app/services';
import { IWorkFlowController } from 'src/app/interfaces';
import { WorkFlowVM, WorkFlowCM, WorkFlowUM } from 'src/app/dtos';
import { Sequelize } from 'sequelize-typescript';
import { WorkFlowInstance } from 'src/app/models';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlow')
@Controller('/api/v1/WorkFlow')
export class WorkFlowController implements IWorkFlowController {
    constructor(
        protected readonly workFlowService: WorkFlowService,
        @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all workFlows' })
    @ApiOkResponse({description: 'Success return all workFlows'})
    @ApiBadRequestResponse({ description: 'Have error in run time'})
    public async findAll(): Promise<WorkFlowVM[]> {
        return await this.workFlowService
            .findAll({}, [this.sequelize.getRepository(WorkFlowInstance)])
            .then(workFlows =>
                workFlows.map(
                    workFlow =>
                        new WorkFlowVM({
                            Id: workFlow.Id,
                            Name: workFlow.Name,
                            Description: workFlow.Description,
                            IsDelete: workFlow.IsDelete,
                            CreatedAt: workFlow.CreatedAt,
                            UpdatedAt: workFlow.UpdatedAt
                        }),
                ),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowController] [findAll function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an workFlow by Id' })
    @ApiOkResponse({description: 'Success return an workFlow\'s information'})
    @ApiNotFoundResponse({description: 'Fail to find workFlow by Id'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async findById(@Param('id') id: string): Promise<WorkFlowVM> {
        return await this.workFlowService
            .findById({ Id: id }, [this.sequelize.getRepository(WorkFlowInstance)])
            .then(workFlow => {
                if (workFlow !== null) {
                    return new WorkFlowVM({
                        Id: workFlow.Id,
                            Name: workFlow.Name,
                            Description: workFlow.Description,
                            IsDelete: workFlow.IsDelete,
                            CreatedAt: workFlow.CreatedAt,
                            UpdatedAt: workFlow.UpdatedAt
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
                    'Error at [WorkFlowController] [findByUsername function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Post()
    @ApiOperation({ summary: 'Insert new workFlow' })
    @ApiCreatedResponse({description: 'Success create new workFlow'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async insert(@Body() body: WorkFlowCM): Promise<WorkFlowVM> {
        return await this.workFlowService
            .insert({ ...body as any })
            .then(
                workFlow =>
                    new WorkFlowVM({
                        Id: workFlow.Id,
                        Name: workFlow.Name,
                        Description: workFlow.Description,
                        IsDelete: workFlow.IsDelete,
                        CreatedAt: workFlow.CreatedAt,
                        UpdatedAt: workFlow.UpdatedAt
                    }),
            )
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowController] [insert function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update an workFlow by Id' })
    @ApiCreatedResponse({description: 'Success update new workFlow'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async update(@Body() body: WorkFlowUM): Promise<WorkFlowVM> {
        return await this.findById(body.Id).then(async () => {
            return await this.workFlowService
            .update(body as any, { Id: body.Id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${body.Id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowController] [update function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
        })
        .catch(e => {
            throw new HttpException(
                'Error at [WorkFlowController] [update function] with [message]: ' +
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an workFlow by Id' })
    @ApiCreatedResponse({description: 'Success delete new workFlow'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async remove(id: string): Promise<WorkFlowVM> {
        return await this.workFlowService
            .remove({ Id: id })
            .then(() => {
                throw new HttpException(
                    `Remove information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowController] [remove function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an workFlow by Id' })
    @ApiCreatedResponse({description: 'Success active new workFlow'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async active(id: string): Promise<WorkFlowVM> {
        return await this.workFlowService
            .update({ IsDelete: false } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowController] [active function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an workFlow by Id' })
    @ApiCreatedResponse({description: 'Success deactive new workFlow'})
    @ApiBadRequestResponse({description: 'Have error in run time'})
    public async deactive(id: string): Promise<WorkFlowVM> {
        return await this.workFlowService
            .update({ IsDelete: true } as any, { Id: id })
            .then(() => {
                throw new HttpException(
                    `Update information of ${id} successfully !!!`,
                    HttpStatus.CREATED,
                );
            })
            .catch(e => {
                throw new HttpException(
                    'Error at [WorkFlowController] [deactive function] with [message]: ' +
                    e.message,
                    HttpStatus.BAD_REQUEST,
                );
            });
    }
}
