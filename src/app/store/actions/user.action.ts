import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUserInfo = 'LoadUserInfo',
    LoadUserInfoSuccess = 'LoadUserInfoSuccess',
    LoadUserInfoError = 'LoadUserInfoError',

    UpdateUserInfoSuccess = 'UpdateUserInfoSuccess',

    ResetUser = 'ResetUser',

    LoadMemberList = 'LoadMemberList',
    LoadMemberListSuccess = 'LoadMemberListSuccess',
    LoadMemberListError = 'LoadMemberListError',

    DeleteMember = 'DeleteMember',
    DeleteMemberSuccess = 'DeleteMemberSuccess',
    DeleteMemberError = 'DeleteMemberError',

    LoadRoleList = 'LoadRoleList',
    LoadRoleListSuccess = 'LoadRoleListSuccess',
    LoadRoleListError = 'LoadRoleListError',

    AddRoleSuccess = 'AddRoleListSuccess',
    AddRoleError = 'AddRoleListError',

    UpdateRoleSuccess = 'UpdateRoleSuccess',
    UpdateRoleError = 'UpdateRoleError',

    DeleteRoleSuccess = 'DeleteRoleSuccess',
    DeleteRoleError = 'DeleteRoleError',
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

export class LoadMemberList implements Action {
    readonly type = UserActionTypes.LoadMemberList;
    constructor(public payload: any) { }
}

export class LoadMemberListSuccess implements Action {
    readonly type = UserActionTypes.LoadMemberListSuccess;
    constructor(public payload: any) { }
}

export class LoadMemberListError implements Action {
    readonly type = UserActionTypes.LoadMemberListError;
    constructor(public payload: any) { }
}

export class DeleteMember implements Action {
    readonly type = UserActionTypes.DeleteMember;
    constructor(public payload: any) { }
}

export class DeleteMemberSuccess implements Action {
    readonly type = UserActionTypes.DeleteMemberSuccess;
    constructor(public payload: any) { }
}

export class DeleteMemberError implements Action {
    readonly type = UserActionTypes.DeleteMemberError;
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


export class LoadRoleList implements Action {
    readonly type = UserActionTypes.LoadRoleList;
    constructor(public payload: any) { }
}

export class LoadRoleListSuccess implements Action {
    readonly type = UserActionTypes.LoadRoleListSuccess;
    constructor(public payload: any) { }
}

export class LoadRoleListError implements Action {
    readonly type = UserActionTypes.LoadRoleListError;
    constructor(public payload: any) { }
}

export class AddRoleSuccess implements Action {
    readonly type = UserActionTypes.AddRoleSuccess;
    constructor(public payload: any) { }
}

export class AddRoleError implements Action {
    readonly type = UserActionTypes.AddRoleError;
    constructor(public payload: any) { }
}

export class UpdateRoleSuccess implements Action {
    readonly type = UserActionTypes.UpdateRoleSuccess;
    constructor(public payload: any) { }
}

export class UpdateRoleError implements Action {
    readonly type = UserActionTypes.UpdateRoleError;
    constructor(public payload: any) { }
}

export class DeleteRoleSuccess implements Action {
    readonly type = UserActionTypes.DeleteRoleSuccess;
    constructor(public payload: any) { }
}

export class DeleteRoleError implements Action {
    readonly type = UserActionTypes.DeleteRoleError;
    constructor(public payload: any) { }
}