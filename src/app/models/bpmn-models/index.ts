import { Stage, Activity, Deal, Process, DealDetail, Note } from '.';

export * from './deal.model';
export * from './stage.model';
export * from './activity.model';
export * from './process.model';
export * from './deal-detail.model';
export * from './note.model';

export const BPMN_MODELS = [ Stage, Activity, Deal, Process, DealDetail, Note];
