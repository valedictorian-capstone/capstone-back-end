import { 
  DepartmentController,  
  GroupController, 
  CommentController
} from '.'

export * from './group.controller';
export * from './department.controller';
export * from './comment.controller';

export const BASIC_CONTROLLERS = [
  DepartmentController,
  GroupController,
  CommentController
];