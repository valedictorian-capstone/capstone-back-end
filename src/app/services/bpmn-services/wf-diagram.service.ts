import { WF, WFConnection, WFStep } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { WFConnectionRepository, WFStepRepository } from "@repositories";
import { WF_CONNECTION_REPOSITORY, WF_REPOSITORY } from "@types";
import { WFCM, WFUM, WFVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WFRepository } from "src/app/repositories/bpmn-repositories/wf.repository";
import { WF_STEP_REPOSITORY } from "src/app/types/bpmn-types/work-step.type";
import { WFDiagramCM } from "src/app/view-models/bpmn-view-models/wf-diagram.view-model";

@Injectable()
export class WFDiagramService {

  constructor(
    @Inject(WF_REPOSITORY) protected readonly wfRepository: WFRepository,
    @Inject(WF_STEP_REPOSITORY) protected readonly wfStepRepository: WFStepRepository,
    @Inject(WF_CONNECTION_REPOSITORY) protected readonly wFConnectionRepository: WFConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findById = async (id: string): Promise<WFVM> => {
    return null;
  }

  public readonly insert = async (body: WFDiagramCM): Promise<WFVM> => {
    const wf = new WF();
    wf.id = body.id
    wf.name = body.content
    wf.description = body.description;
    wf.style = body as any;
    await this.wfRepository.useHTTP().save(wf)
      .then(async model => {
        body.nodes.forEach(item => {
          
          const wfStep = new WFStep();
          wfStep.id = item.id;
          wfStep.name = item.annotations[0]?.content;
          wfStep.description = item.description;
          wfStep.type = item.shape?.type;
          wfStep.subType = item.shape?.shape;
          wfStep.style = item as any;
          wfStep.wF = model;
          
          this.wfStepRepository.useHTTP().save(wfStep).then((wfStepModel) => {
            body.connectors.filter(connector => connector.sourceID === item.id || connector.targetID === item.id)
            .forEach(
              connection => {
                const wfConnection = new WFConnection()
                wfConnection.id = connection.id
                wfConnection.name = connection.annotations[0]?.content
                wfConnection.description = connection.description
                wfConnection.type = connection.type
                wfConnection.toWFStep = connection.sourceID === item.id ? wfStepModel : null
                wfConnection.fromWFStep = connection.targetID === item.id ? wfStepModel : null
                wfConnection.wf = model
                this.wFConnectionRepository.useHTTP().save(wfConnection)
                return wfConnection;
              }
            )
          })
          // const wfToConnections = body.connectors
          // .filter(connector => connector.sourceID == item.id)
          //   .map(
          //     connection => {
          //       const wfConnection = new WFConnection()
          //       wfConnection.id = connection.id;
          //       wfConnection.name = connection.annotations[0]?.content;
          //       wfConnection.description = connection.description;
          //       wfConnection.type = connection.type;
          //       wfConnection.wf = model
          //       return wfConnection;
          //     }
          //   )
          
        });
        return model;
      })


    return null;
  }

  public readonly update = async (body: WFUM): Promise<WFVM> => {
    return null;
  }

  public readonly remove = async (id: string): Promise<any> => {
    return null;
  }
}