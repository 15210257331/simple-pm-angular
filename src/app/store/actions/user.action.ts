import { Action } from '@ngrx/store';

export enum UserActionTypes {

    LoadUserInfo = 'LoadUserInfo',
    LoadUserInfoSuccess = 'LoadUserInfoSuccess',
    LoadUserInfoError = 'LoadUserInfoError',

    UpdateUserInfoSuccess = 'UpdateUserInfoSuccess',

    ResetUser = 'ResetUser',
}

export class LoadUserInfo implements Action {
    readonly type = UserActionTypes.LoadUserInfo;
}

export class LoadUserInfoSuccess implements Action {
    readonly type = UserActionTypes.LoadUserInfoSuccess;
    constructor(public payload: any) { }
}

export class LoadUserInfoError implements Action {
    readonly type = UserActionTypes.LoadUserInfoError;
    constructor(public payload: any) { }
}

export class UpdateUserInfoSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserInfoSuccess;
    constructor(public payload: any) { }
}

export class ResetUser implements Action {
    readonly type = UserActionTypes.ResetUser;
    constructor(public payload: any) { }
}
