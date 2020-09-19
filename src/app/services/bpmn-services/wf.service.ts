import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { WF_REPOSITORY, WF_SERVICE } from "@types";
import { WFVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WF } from "src/app/models/bpmn-models/wf.model";
import { WFRepository } from "src/app/repositories/bpmn-repositories/wf.repository";

export class WFService {
 
  constructor(
    @Inject(WF_REPOSITORY)protected readonly wfRepository: WFRepository,
    @InjectMapper() protected readonly mapper: AutoMapper  
  ){}

  public readonly findAll = async () :Promise<WFVM[]> =>{
    return await this.wfRepository.useHTTP().find()
    .then((models) => this.mapper.mapArray(models, WFVM, WF))
    .catch(
      (e) => {
        console.log(e)
        throw new HttpException(
          `Error at [`+WF_SERVICE+`] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      }
    )
  }
}