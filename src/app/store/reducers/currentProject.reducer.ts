import { Action } from '@ngrx/store';
import { CurrentProjectActionTypes } from '../actions';

export interface ProjectAction extends Action {
    type: string;
    payload: any;
}

export interface CurrentProject {
    [key: string]: any;
}

export const initialState: CurrentProject = {};

export function currentProjectReducer(state: CurrentProject = initialState, action: ProjectAction) {
    switch (action.type) {

        case CurrentProjectActionTypes.LoadCurrentProjectSuccess:
            state = action.payload.data;
            return state;

        case CurrentProjectActionTypes.AddTaskSuccess:
            state.task.unshift(action.payload.data);
            return state;

        case CurrentProjectActionTypes.ChangeTaskStatusCuccess:
            state.task.map(item => {
                if (item._id === action.payload._id) {
                    item.status = action.payload.status;
                }
            });
            return state;

        case CurrentProjectActionTypes.DeleteTaskCuccess:
            let deleteIndex;
            state.task.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteIndex = index;
                }
            });
            state.task.splice(deleteIndex, 1);
            return state;

        case CurrentProjectActionTypes.AddProjectTagSuccess:
            state.tag.push(action.payload.data);
            return state;

        case CurrentProjectActionTypes.ResetCurrentProject:
            state = initialState;
            return state;

        case CurrentProjectActionTypes.AddProjectMemberSuccess:
            state.participant.push(action.payload.data);
            return state;

        case CurrentProjectActionTypes.AddProjectMemberError:
            state = initialState;
            return state;

        default:
            return state;
    }
}
