import { Action } from '@ngrx/store';
import { ProjectListActionTypes } from '../actions';

export interface ProjectAction extends Action {
    type: string;
    payload: any;
}

export interface Project {
    [key: string]: any;
}

export const initialState: Array<Project> = [];

export function projectListReducer(state: Array<Project> = initialState, action: ProjectAction) {
    switch (action.type) {

        case ProjectListActionTypes.LoadProjectListSuccess:
            state = action.payload.data;
            return state;

        case ProjectListActionTypes.AddProjectSuccess:
            state.unshift(action.payload.data);
            return state;

        case ProjectListActionTypes.UpdateProjectSuccess:
            state.map(item => {
                if (item._id === action.payload.data._id) {
                    item.name = action.payload.data.name;
                    item.content = action.payload.data.content;
                    item.cover = action.payload.data.cover;
                }
            });
            return state;

        case ProjectListActionTypes.DeleteProjectSuccess:
            let deleteProjectIndex;
            state.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteProjectIndex = index;
                }
            });
            state.splice(deleteProjectIndex, 1);
            return state;

        default:
            return state;
    }
}
