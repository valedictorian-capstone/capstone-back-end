import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { WFDiagramService } from "@services";
import { WFConnectionVM } from "@view-models";
import { WFDiagramCM } from "src/app/view-models/bpmn-view-models/wf-diagram.view-model";

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowDiagram')
@Controller('/api/v1/wf-diagram')
export class WFDiagramController {
  constructor(
    protected readonly wfDiagramService: WFDiagramService,
  ) { }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get an wf diagram connection by Id' })
  // @ApiOkResponse({ description: "Success return an wf diagram connection's information" })
  // @ApiNotFoundResponse({ description: 'Fail to find wf diagram connection by Id' })
  // @ApiBadRequestResponse({ description: 'Have error in run time' })
  // public async findById(@Param('id') id: string): Promise<WFConnectionVM> {
  //   return await this.wfConnectionService.WFDiagramService(id);
  // }

  @Post()
  @ApiOperation({ summary: 'Insert new wf diagram connection' })
  @ApiCreatedResponse({ description: 'Success create new wf diagram connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: WFDiagramCM): Promise<any> {
    return await this.wfDiagramService.insert(body);
  }

  // @Put()
  // @ApiOperation({ summary: 'Update an wf diagram by Id' })
  // @ApiCreatedResponse({ description: 'Success update new wf connection' })
  // @ApiBadRequestResponse({ description: 'Have error in run time' })
  // public async update(@Body() body: WFConnectionUM): Promise<WFConnectionVM> {
  //   return await this.wfConnectionService.WFDiagramService(body);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete an wf connection by Id' })
  // @ApiCreatedResponse({ description: 'Success delete new wf connection' })
  // @ApiBadRequestResponse({ description: 'Have error in run time' })
  // public async remove(@Param('id') id: string): Promise<WFConnectionVM> {
  //   return await this.wfConnectionService.WFDiagramService(id);
  // }
}
