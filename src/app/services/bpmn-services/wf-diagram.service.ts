import { WF, WFConnection, WFStep } from "@models";
import { Inject, Injectable } from "@nestjs/common";
import { WFConnectionRepository, WFStepRepository } from "@repositories";
import { WF_CONNECTION_REPOSITORY, WF_REPOSITORY } from "@types";
import { WFVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WFRepository } from "src/app/repositories/bpmn-repositories/wf.repository";
import { WF_STEP_REPOSITORY } from "src/app/types/bpmn-types/work-flow-step.type";
import { WFDiagramCM } from "src/app/view-models/bpmn-view-models/wf-diagram.view-model";

@Injectable()
export class WFDiagramService {

  constructor(
    @Inject(WF_REPOSITORY) protected readonly wfRepository: WFRepository,
    @Inject(WF_STEP_REPOSITORY) protected readonly wfStepRepository: WFStepRepository,
    @Inject(WF_CONNECTION_REPOSITORY) protected readonly wFConnectionRepository: WFConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  // public readonly findById = async (id: string): Promise<WFVM> => {
  //   return null;
  // }

  public readonly insert = async (body: WFDiagramCM): Promise<WFVM> => {
    const wf = new WF();
    wf.id = body.id
    wf.name = body.content
    wf.description = body.description;
    wf.props = body as any;
    let wfSteps: WFStep[];
    const wfModel = await this.wfRepository.useHTTP().save(wf)
      .then(async model => {
        wfSteps = body.nodes.map(item => {
          const wfStep = new WFStep();
          wfStep.id = item.id;
          wfStep.name = item.annotations[0]?.content;
          wfStep.description = item.description;
          wfStep.type = item.shape?.type;
          wfStep.shape = item.shape?.shape;
          wfStep.props = item as any;
          wfStep.wF = model;
          return wfStep;
        });
        return model;
      })
    await this.wfStepRepository.useHTTP().save(wfSteps).then((wfStepModel) => {
      wfStepModel.forEach(stepModel => {
        body.connectors.filter(connector => connector.sourceID === stepModel.id || connector.targetID === stepModel.id)
          .forEach(
            connection => {
              const wfConnection = new WFConnection()
              wfConnection.id = connection.id
              wfConnection.name = connection.annotations[0]?.content
              wfConnection.description = connection.description
              wfConnection.type = connection.type
              wfConnection.toWFStep = connection.sourceID === stepModel.id ? stepModel : null
              wfConnection.fromWFStep = connection.targetID === stepModel.id ? stepModel : null
              wfConnection.wf = wfModel
              this.wFConnectionRepository.useHTTP().save(wfConnection)
              return wfConnection;
            }
          )
      })
    })
    return this.mapper.map(wfModel, WFVM, WF);
  }

  // public readonly update = async (body: WFUM): Promise<WFVM> => {
  //   return null;
  // }

  // public readonly remove = async (id: string): Promise<any> => {
  //   return null;
  // }
}