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
