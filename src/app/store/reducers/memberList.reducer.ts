import { Action } from '@ngrx/store';
import { MemberListActionTypes } from '../actions';

export interface MemberAction extends Action {
    type: string;
    payload: any;
}

export interface MemberState {
    [key: string]: any;
}

export const initialState: Array<MemberState> = [];

export function memberListReducer(state: Array<MemberState> = initialState, action: MemberAction) {
    switch (action.type) {

        case MemberListActionTypes.LoadMemberListSuccess:
            state = action.payload.data;
            return state;

        case MemberListActionTypes.LoadMemberListError:
            return state;

        case MemberListActionTypes.DeleteMemberSuccess:
            let deleteIndex;
            state.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteIndex = index;
                }
            });
            state.splice(deleteIndex, 1);
            return state;

        case MemberListActionTypes.DeleteMemberError:
            return state;

        default:
            return state;
    }
}
