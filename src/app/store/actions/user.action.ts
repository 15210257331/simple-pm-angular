import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUserInfo = 'LoadUserInfo',
    LoadUserInfoSuccess = 'LoadUserInfoSuccess',
    LoadUserInfoError = 'LoadUserInfoError',

    LoadMemberList = 'LoadMemberList',
    LoadMemberListSuccess = 'LoadMemberListSuccess',
    LoadMemberListError = 'LoadMemberListError',

    UpdateUserInfoSuccess = 'UpdateUserInfoSuccess',

    Logout = 'Logout',
}

export class LoadUserInfo implements Action {
    readonly type = UserActionTypes.LoadUserInfo;
}

export class LoadUserInfoSuccess implements Action {
    readonly type = UserActionTypes.LoadUserInfoSuccess;
    constructor(public payload: any) {}
}

export class LoadUserInfoError implements Action {
    readonly type = UserActionTypes.LoadUserInfoError;
    constructor(public payload: any) {}
}

export class LoadMemberList implements Action {
    readonly type = UserActionTypes.LoadMemberList;
}

export class LoadMemberListSuccess implements Action {
    readonly type = UserActionTypes.LoadMemberListSuccess;
    constructor(public payload: any) {}
}

export class LoadMemberListError implements Action {
    readonly type = UserActionTypes.LoadMemberListError;
    constructor(public payload: any) {}
}

export class UpdateUserInfoSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserInfoSuccess;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = UserActionTypes.Logout;
    constructor() {}
}


