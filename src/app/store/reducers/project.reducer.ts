import { ProjectActions, ProjectActionTypes } from '../actions';
import { IProject, IUser, ICategory, INotification } from './../../models';

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
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.GET_PROJECT_SUCCESS: {
      return { ...state, activeProject: action.payload };
    }
    case ProjectActionTypes.OPEN_CREATE_PROJECT_MODAL: {
      return { ...state, openModal: true };
    }

    case ProjectActionTypes.CLOSE_CREATE_PROJECT_MODAL: {
      return { ...state, openModal: false };
    }

    case ProjectActionTypes.CREATE_PROJECT_COMPLETE: {
      return { ...state, activeProject: action.payload };
    }

    case ProjectActionTypes.PROJECT_ERRORS: {
      return { ...state, errors: action.payload };
    }

    default: {
      return state;
    }
  }
}
