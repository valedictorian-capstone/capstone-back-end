
import { Stage, Activity, Deal, Pipeline, DealDetail, Note, Attachment, Log } from '.';


export * from './deal.model';
export * from './stage.model';
export * from './activity.model';
export * from './attachment.model';
export * from './pipeline.model';
export * from './deal-detail.model';
export * from './note.model';
export * from './log.model';

export const BPMN_MODELS = [ Stage, Activity, Deal, Pipeline, DealDetail, Note, Attachment, Log];
