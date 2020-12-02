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
  import { CommentUM, CommentVM } from '@view-models';
  import { CommentService } from '@services';
  
  @ApiBearerAuth('JWT')
  @ApiTags('Comment')
  @Controller('/api/v1/Comment')
  export class CommentController{
    constructor(
      protected service: CommentService,
    ) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all Comments' })
    @ApiOkResponse({ description: 'Success return all Comments' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<CommentVM[]> {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an Comment by Id' })
    @ApiOkResponse({ description: "Success return an Comment's information" })
    @ApiNotFoundResponse({ description: 'Fail to find Comment by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<CommentVM> {
      return this.service.findById(id);
    }

    @Get('/product/:id')
    @ApiOperation({ summary: 'Get an Comment by productId' })
    @ApiOkResponse({ description: "Success return an Comment's information" })
    @ApiNotFoundResponse({ description: 'Fail to find Comment by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAllByProduct(@Param('id') id: string): Promise<CommentVM> {
      return this.service.findAllByProduct(id);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an Comment by Id' })
    @ApiCreatedResponse({ description: 'Success update new Comment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public save(@Body() body: CommentUM): Promise<CommentVM> {
      return this.service.save(body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Comment by Id' })
    @ApiCreatedResponse({ description: 'Success delete new Comment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<CommentVM> {
      return this.service.remove(id);
    }
  
    @Put('Active/:id')
    @ApiOperation({ summary: 'Active an Comment by Id' })
    @ApiCreatedResponse({ description: 'Success active new Comment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<CommentVM[]> {
      return this.service.active(id);
    }
  
    @Put('DeActive/:id')
    @ApiOperation({ summary: 'Deative an Comment by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new Comment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<CommentVM[]> {
      return this.service.deactive(id);
    }
  }
  