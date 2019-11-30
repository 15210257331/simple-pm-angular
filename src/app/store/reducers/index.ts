import { ActionReducerMap } from '@ngrx/store';
import { projectReducer, ProjectState } from './project.reducer';
import { userReducer, UserState } from './user.reducer';
import { Schedule, scheduleReducer } from './schedule.reducer';


// state 一个应用级的总的状态(单一状态树)
export interface Appstate {
    projectState: ProjectState;
    userState: UserState;
    scheduleState: Array<Schedule>;
}

// 将状态中的每一个状态注册相应的reducer
export const reducers: ActionReducerMap<Appstate> = {
    projectState: projectReducer,
    userState: userReducer,
    scheduleState: scheduleReducer,
};

