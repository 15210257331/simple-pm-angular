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
}

export const initialState: UserState = {
    userInfo: {},
    memberList: []
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
