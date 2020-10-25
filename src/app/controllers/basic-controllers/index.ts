import { 
  DepartmentController,  
  GroupController, 
  PatternController,
  CommentController
} from '.'

export * from './group.controller';
export * from './department.controller';
export * from './pattern.controller';
export * from './comment.controller';

export const BASIC_CONTROLLERS = [
  DepartmentController,
  GroupController,
  PatternController,
  CommentController
];