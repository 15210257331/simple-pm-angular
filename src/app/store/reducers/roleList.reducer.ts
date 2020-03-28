import { Action } from '@ngrx/store';
import { RoleListActionTypes } from '../actions';

export interface RoleListAction extends Action {
    type: string;
    payload: any;
}


export interface RoleState {
    [key: string]: any;
}

export const initialState: Array<RoleState> = [];

export function roleListReducer(state: Array<RoleState> = initialState, action: RoleListAction) {
    switch (action.type) {

        case RoleListActionTypes.LoadRoleListSuccess:
            state = action.payload.data;
            return state;

        case RoleListActionTypes.LoadRoleListError:
            return state;

        case RoleListActionTypes.AddRoleSuccess:
            state.push(action.payload.data);
            return state;

        case RoleListActionTypes.AddRoleError:
            return state;

        case RoleListActionTypes.UpdateRoleSuccess:
            state.map(item => {
                if (item._id === action.payload.data._id) {
                    item.name = action.payload.data.name;
                    item.description = action.payload.data.description;
                    item.authority = action.payload.data.authority;
                }
            });
            return state;

        case RoleListActionTypes.UpdateRoleError:
            return state;

        case RoleListActionTypes.DeleteRoleSuccess:
            let deleteRoleIndex;
            state.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteRoleIndex = index;
                }
            });
            state.splice(deleteRoleIndex, 1);
            return state;

        case RoleListActionTypes.DeleteRoleError:
            return state;

        default:
            return state;
    }
}
