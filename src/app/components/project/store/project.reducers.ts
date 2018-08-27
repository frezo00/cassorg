import * as ProjectActions from './project.actions';
import { IProject, IUser, ICategory, INotification } from './../../../models';

export interface ProjectState {
  activeProject: IProject;
  administrators: IUser[];
  categories: ICategory[];
  notifications: INotification[];
  openModal: boolean;
  errors: any;
}

const initialState: ProjectState = {
  activeProject: null,
  administrators: [],
  categories: [],
  notifications: [],
  openModal: false,
  errors: null
};

export function projectReducer(
  state = initialState,
  action: ProjectActions.ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActions.ProjectActionTypes.GET_PROJECT_SUCCESS: {
      return { ...state, activeProject: action.payload };
    }
    case ProjectActions.ProjectActionTypes.OPEN_CREATE_PROJECT_MODAL: {
      return { ...state, openModal: true };
    }

    case ProjectActions.ProjectActionTypes.CLOSE_CREATE_PROJECT_MODAL: {
      return { ...state, openModal: false };
    }

    case ProjectActions.ProjectActionTypes.CREATE_PROJECT_COMPLETE: {
      return { ...state, activeProject: action.payload };
    }

    case ProjectActions.ProjectActionTypes.PROJECT_ERRORS: {
      return { ...state, errors: action.payload };
    }

    default: {
      return state;
    }
  }
}
