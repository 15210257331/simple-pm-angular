import { ActionReducerMap } from '@ngrx/store';
import { projectListReducer, Project } from './projectList.reducer';
import { userInfoReducer, UserInfoState } from './userInfo.reducer';
import { Schedule, scheduleListReducer } from './scheduleList.reducer';
import { RoleState, roleListReducer } from './roleList.reducer';
import { memberListReducer, MemberState } from './memberList.reducer';
import { currentProjectReducer, CurrentProject } from './currentProject.reducer';


// state 一个应用级的总的状态(单一状态树)
export interface Appstate {
    projectList: Array<Project>;
    currentProject: CurrentProject;
    userInfo: UserInfoState;
    scheduleList: Array<Schedule>;
    roleList: Array<RoleState>;
    memberList: Array<MemberState>;
}

// 将状态中的每一个状态注册相应的reducer
export const reducers: ActionReducerMap<Appstate> = {
    projectList: projectListReducer,
    currentProject: currentProjectReducer,
    userInfo: userInfoReducer,
    scheduleList: scheduleListReducer,
    roleList: roleListReducer,
    memberList: memberListReducer,
};

