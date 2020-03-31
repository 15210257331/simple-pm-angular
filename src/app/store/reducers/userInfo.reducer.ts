import { Action } from '@ngrx/store';
import { UserInfoActionTypes } from '../actions';

export interface UserAction extends Action {
    type: string;
    payload: any;
}

// 用户信息
export interface UserInfoState {
    [key: string]: any;
}

export const initialState: UserInfoState = {};

export function userInfoReducer(state: UserInfoState = initialState, action: UserAction) {
    switch (action.type) {
        case UserInfoActionTypes.LoadUserInfoSuccess:
            state = action.payload.data;
            return state;

        case UserInfoActionTypes.LoadUserInfoError:
            return state;

        case UserInfoActionTypes.UpdateUserInfoSuccess:
            state = action.payload.data;
            return state;

        case UserInfoActionTypes.ResetUser:
            state = {};
            return state;

        default:
            return state;
    }
}
