import { Action } from '@ngrx/store';
import { UserActionTypes } from '../actions';

export interface UserAction extends Action {
    type: string;
    payload: any;
}

// 用户信息
export interface UserState {
    userInfo: any;
    memberList: any[];
    roleList: any[];
}

export const initialState: UserState = {
    userInfo: {},
    memberList: [],
    roleList: []
};

export function userReducer(state: UserState = initialState, action: UserAction) {
    switch (action.type) {
        case UserActionTypes.LoadUserInfoSuccess:
            state.userInfo = action.payload.data;
            return state;

        case UserActionTypes.LoadUserInfoError:
            return state;

        case UserActionTypes.LoadMemberListSuccess:
            state.memberList = action.payload.data;
            return state;

        case UserActionTypes.LoadMemberListError:
            return state;

        case UserActionTypes.LoadRoleListSuccess:
            state.roleList = action.payload.data;
            return state;

        case UserActionTypes.LoadRoleListSuccess:
            return state;

        case UserActionTypes.DeleteMemberSuccess:
            let deleteIndex;
            state.memberList.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteIndex = index;
                }
            });
            state.memberList.splice(deleteIndex, 1);
            return state;

        case UserActionTypes.DeleteMemberError:
            return state;

        case UserActionTypes.AddRoleSuccess:
            state.roleList.push(action.payload.data);
            return state;

        case UserActionTypes.AddRoleError:
            return state;

        case UserActionTypes.UpdateRoleSuccess:
            state.roleList.map(item => {
                if (item._id === action.payload.data._id) {
                    item.name = action.payload.data.name;
                    item.description = action.payload.data.description;
                }
            });
            return state;

        case UserActionTypes.UpdateRoleError:
            return state;

        case UserActionTypes.DeleteRoleSuccess:
            let deleteRoleIndex;
            state.roleList.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteRoleIndex = index;
                }
            });
            state.roleList.splice(deleteRoleIndex, 1);
            return state;

        case UserActionTypes.DeleteRoleError:
            return state;

        case UserActionTypes.UpdateUserInfoSuccess:
            state.userInfo = action.payload.data;
            return state;

        case UserActionTypes.ResetUser:
            state.memberList = [];
            state.userInfo = {};
            return state;

        default:
            return state;
    }
}
