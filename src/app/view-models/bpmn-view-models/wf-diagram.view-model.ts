import { ApiProperty } from "@nestjs/swagger"

export class WFDiagramCM {
  @ApiProperty()
  public readonly id: string
  @ApiProperty()
  public readonly content: string
  @ApiProperty()
  public readonly description: string
  @ApiProperty()
  public readonly width: string
  @ApiProperty()
  public readonly height: string
  @ApiProperty()
  public readonly nodes: NodeCM[]
  @ApiProperty()
  public readonly snapSettings: [any]
  @ApiProperty()
  public readonly connectors: ConnectorCM[]
  @ApiProperty()
  public readonly getConnectorDefaults: any
  @ApiProperty()
  public readonly dragEnter: any
  @ApiProperty()
  public readonly enableRtl: boolean
  @ApiProperty()
  public readonly locale: string
  @ApiProperty()
  public readonly enablePersistence: boolean
  @ApiProperty()
  public readonly scrollSettings: any
  @ApiProperty()
  public readonly rulerSettings: any
  @ApiProperty()
  public readonly backgroundColor: string
  @ApiProperty()
  public readonly dataSourceSettings: any
  @ApiProperty()
  public readonly mode: string
  @ApiProperty()
  public readonly layers: any
  @ApiProperty()
  public readonly diagramSettings: any
  @ApiProperty()
  public readonly constraints: number
  @ApiProperty()
  public readonly layout: any
  @ApiProperty()
  public readonly pageSettings: any
  @ApiProperty()
  public readonly selectedItems: any
  @ApiProperty()
  public readonly basicElements: [any]
  @ApiProperty()
  public readonly tooltip: any
  @ApiProperty()
  public readonly commandManager: any
  @ApiProperty()
  public readonly tool: number
  @ApiProperty()
  public readonly customCursor: [any]
  @ApiProperty()
  public readonly version: number
}

export class ConnectorCM {
  @ApiProperty()
  public readonly shape: { type: string }
  @ApiProperty()
  public readonly id: string
  @ApiProperty()
  public readonly type: string
  @ApiProperty()
  public readonly description: string
  @ApiProperty()
  public readonly sourcePoint: any
  @ApiProperty()
  public readonly targetPoint: any
  @ApiProperty()
  public readonly targetDecorator: any
  @ApiProperty()
  public readonly style: any
  @ApiProperty()
  public readonly sourcePortID: string
  @ApiProperty()
  public readonly targetPortID: string
  @ApiProperty()
  public readonly sourceID: string
  @ApiProperty()
  public readonly targetID: string
  @ApiProperty()
  public readonly flip: string
  @ApiProperty()
  public readonly segments: [any]
  @ApiProperty()
  public readonly sourceDecorator: any
  @ApiProperty()
  public readonly cornerRadius: number
  @ApiProperty()
  public readonly wrapper: any
  @ApiProperty()
  public readonly annotations: [{
    id: string
    content: string
    annotationType: string
    constraints: number
    visibility: boolean
    rotateAngle: number
    horizontalAlignment: string
    verticalAlignment: string
    margin: any
    style: any
    offset: number
    alignment: string
    segmentAngle: string
  }]
  @ApiProperty()
  public readonly previewSize: any
  @ApiProperty()
  public readonly zIndex: number
  @ApiProperty()
  public readonly visible: boolean
  @ApiProperty()
  public readonly constraints: number
  @ApiProperty()
  public readonly connectionPadding: number
  @ApiProperty()
  public readonly hitPadding: number
  @ApiProperty()
  public readonly tooltip: { openOn: string }
  @ApiProperty()
  public readonly sourcePadding: number
  @ApiProperty()
  public readonly targetPadding: number
  @ApiProperty()
  public readonly parentId: string
}

export class NodeCM {
  @ApiProperty()
  public readonly shape: { type: string, shape: string }
  @ApiProperty()
  public readonly id: string
  @ApiProperty()
  public readonly description: string
  @ApiProperty()
  public readonly height: number
  @ApiProperty()
  public readonly width: number
  @ApiProperty()
  public readonly offsetX: number
  @ApiProperty()
  public readonly offsetY: number
  @ApiProperty()
  public readonly annotations: [{
    id: string
    content: string
    annotationType: string
    style: any
    hyperlink: any
    constraints: number
    visibility: boolean
    rotateAngle: number
    margin: any
    horizontalAlignment: string
    verticalAlignment: string
    offset: any
  }]
  @ApiProperty()
  public readonly style: any
  @ApiProperty()
  public readonly zIndex: number
  @ApiProperty()
  public readonly container: any
  @ApiProperty()
  public readonly visible: boolean
  @ApiProperty()
  public readonly horizontalAlignment: string
  @ApiProperty()
  public readonly verticalAlignment: string
  @ApiProperty()
  public readonly backgroundColor: string
  @ApiProperty()
  public readonly borderColor: string
  @ApiProperty()
  public readonly borderWidth: number
  @ApiProperty()
  public readonly rotateAngle: number
  @ApiProperty()
  public readonly pivot: any
  @ApiProperty()
  public readonly margin: any
  @ApiProperty()
  public readonly flip: string
  @ApiProperty()
  public readonly wrapper: any
  @ApiProperty()
  public readonly constraints: number
  @ApiProperty()
  public readonly ports: [any]
  @ApiProperty()
  public readonly isExpanded: true
  @ApiProperty()
  public readonly expandIcon: any
  @ApiProperty()
  public readonly tooltip: any
  @ApiProperty()
  public readonly inEdges: [any]
  @ApiProperty()
  public readonly outEdges: [any]
  @ApiProperty()
  public readonly parentId: string
  @ApiProperty()
  public readonly processId: string
  @ApiProperty()
  public readonly umlIndex: number
  @ApiProperty()
  public readonly isPhase: boolean
  @ApiProperty()
  public readonly isLane: boolean
}

export class WFDiagramVM {

}

export class WFDiagramUM {

} 