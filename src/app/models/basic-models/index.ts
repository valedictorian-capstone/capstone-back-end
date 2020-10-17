import { 
    Group, 
    ExtraInformation, 
    Department, 
    Pattern 
} from '.';

export * from './department.model';
export * from './group.model';
export * from './extra-information.model';
export * from './pattern.model'
export const BASIC_MODELS = [
    Department, 
    ExtraInformation, 
    Group, 
    Pattern
];