import { Action } from '@ngrx/store';
import { ScheduleActionTypes } from '../actions';

export interface UserAction extends Action {
    type: string;
    payload: any;
}

export interface Schedule {
    _id: string;
    name: string;
    content: string;
    startTime: any; // 开始时间
    endTime: any;  // 结束时间
    organizer: any; // 发起人
    participant: Array<any>; // 参与者
}

export const initialState: Array<Schedule> = [];

export function scheduleReducer(state: Array<Schedule> = initialState, action: UserAction) {
    switch (action.type) {
        case ScheduleActionTypes.LoadScheduleSuccess:
            state = action.payload.data;
            return state;
        case ScheduleActionTypes.LoadScheduleError:
            return state;

        case ScheduleActionTypes.AddScheduleSuccess:
            state.push(action.payload.data);
            return state;
        case ScheduleActionTypes.AddScheduleError:
            return state;

        case ScheduleActionTypes.DeleteScheduleSuccess:
            let deleteIndex;
            state.map((item, i) => {
                if (item._id === action.payload.data) {
                    deleteIndex = i;
                }
            });
            state.splice(deleteIndex, 1);
            return state;
        case ScheduleActionTypes.DeleteScheduleError:
            return state;
        default:
            return state;
    }
}
