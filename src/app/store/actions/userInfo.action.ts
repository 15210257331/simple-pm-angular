import { Action } from '@ngrx/store';

export enum UserInfoActionTypes {

    LoadUserInfo = 'LoadUserInfo',
    LoadUserInfoSuccess = 'LoadUserInfoSuccess',
    LoadUserInfoError = 'LoadUserInfoError',

    UpdateUserInfoSuccess = 'UpdateUserInfoSuccess',
    UpdateUserInfoError = 'UpdateUserInfoError',

    ResetUser = 'ResetUser',
}

export class LoadUserInfo implements Action {
    readonly type = UserInfoActionTypes.LoadUserInfo;
}

export class LoadUserInfoSuccess implements Action {
    readonly type = UserInfoActionTypes.LoadUserInfoSuccess;
    constructor(public payload: any) { }
}

export class LoadUserInfoError implements Action {
    readonly type = UserInfoActionTypes.LoadUserInfoError;
    constructor(public payload: any) { }
}

export class UpdateUserInfoSuccess implements Action {
    readonly type = UserInfoActionTypes.UpdateUserInfoSuccess;
    constructor(public payload: any) { }
}

export class ResetUser implements Action {
    readonly type = UserInfoActionTypes.ResetUser;
    constructor(public payload: any) { }
}
