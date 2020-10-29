import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
  import { OrderRequestCM, OrderRequestUM, OrderRequestVM } from '@view-models';
  import { OrderRequestService } from '@services';
  
  @ApiBearerAuth('JWT')
  @ApiTags('OrderRequest')
  @Controller('/api/v1/OrderRequest')
  export class OrderRequestController {
    constructor(
      protected service: OrderRequestService,
    ) { }
  
    @Get()
    @ApiOperation({ summary: 'Get all OrderRequests' })
    @ApiOkResponse({ description: 'Success return all OrderRequests' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<OrderRequestVM[]> {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an OrderRequest by Id' })
    @ApiOkResponse({ description: "Success return an OrderRequest's information" })
    @ApiNotFoundResponse({ description: 'Fail to find OrderRequest by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<OrderRequestVM> {
      return this.service.findById(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Insert new OrderRequest' })
    @ApiCreatedResponse({ description: 'Success create new OrderRequest' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: OrderRequestCM): Promise<OrderRequestVM> {
      return this.service.insert(body);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an OrderRequest by Id' })
    @ApiCreatedResponse({ description: 'Success update new OrderRequest' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: OrderRequestUM): Promise<OrderRequestVM> {
      return this.service.update(body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an OrderRequest by Id' })
    @ApiCreatedResponse({ description: 'Success delete new OrderRequest' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<OrderRequestVM> {
      return this.service.remove(id);
    }
  
    @Put('Active/:id')
    @ApiOperation({ summary: 'Active an OrderRequest by Id' })
    @ApiCreatedResponse({ description: 'Success active new OrderRequest' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<OrderRequestVM> {
      return this.service.active(id);
    }
  
    @Put('DeActive/:id')
    @ApiOperation({ summary: 'Deative an OrderRequest by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new OrderRequest' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<OrderRequestVM> {
      return this.service.deactive(id);
    }
  }
  