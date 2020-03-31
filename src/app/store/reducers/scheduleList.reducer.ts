import { Action } from '@ngrx/store';
import { ScheduleListActionTypes } from '../actions';

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

export function scheduleListReducer(state: Array<Schedule> = initialState, action: UserAction) {
    switch (action.type) {
        case ScheduleListActionTypes.LoadScheduleSuccess:
            state = action.payload.data;
            return state;
        case ScheduleListActionTypes.LoadScheduleError:
            return state;

        case ScheduleListActionTypes.AddScheduleSuccess:
            state.push(action.payload.data);
            return state;
        case ScheduleListActionTypes.AddScheduleError:
            return state;

        case ScheduleListActionTypes.DeleteScheduleSuccess:
            let deleteIndex;
            state.map((item, i) => {
                if (item._id === action.payload.data) {
                    deleteIndex = i;
                }
            });
            state.splice(deleteIndex, 1);
            return state;
        case ScheduleListActionTypes.DeleteScheduleError:
            return state;

        case ScheduleListActionTypes.ResetSchedule:
            state = [];
            return state;

        default:
            return state;
    }
}
