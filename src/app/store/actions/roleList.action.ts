import { Action } from '@ngrx/store';

export enum RoleListActionTypes {
    LoadRoleList = 'LoadRoleList',
    LoadRoleListSuccess = 'LoadRoleListSuccess',
    LoadRoleListError = 'LoadRoleListError',

    AddRoleSuccess = 'AddRoleListSuccess',
    AddRoleError = 'AddRoleListError',

    UpdateRoleSuccess = 'UpdateRoleSuccess',
    UpdateRoleError = 'UpdateRoleError',

    DeleteRoleSuccess = 'DeleteRoleSuccess',
    DeleteRoleError = 'DeleteRoleError',

    ResetRole = 'ResetRole'
}

export class LoadRoleList implements Action {
    readonly type = RoleListActionTypes.LoadRoleList;
    constructor(public payload: any) { }
}

export class LoadRoleListSuccess implements Action {
    readonly type = RoleListActionTypes.LoadRoleListSuccess;
    constructor(public payload: any) { }
}

export class LoadRoleListError implements Action {
    readonly type = RoleListActionTypes.LoadRoleListError;
    constructor(public payload: any) { }
}

export class AddRoleSuccess implements Action {
    readonly type = RoleListActionTypes.AddRoleSuccess;
    constructor(public payload: any) { }
}

export class AddRoleError implements Action {
    readonly type = RoleListActionTypes.AddRoleError;
    constructor(public payload: any) { }
}

export class UpdateRoleSuccess implements Action {
    readonly type = RoleListActionTypes.UpdateRoleSuccess;
    constructor(public payload: any) { }
}

export class UpdateRoleError implements Action {
    readonly type = RoleListActionTypes.UpdateRoleError;
    constructor(public payload: any) { }
}

export class DeleteRoleSuccess implements Action {
    readonly type = RoleListActionTypes.DeleteRoleSuccess;
    constructor(public payload: any) { }
}

export class DeleteRoleError implements Action {
    readonly type = RoleListActionTypes.DeleteRoleError;
    constructor(public payload: any) { }
}

export class ResetRole implements Action {
    readonly type = RoleListActionTypes.ResetRole;
    constructor(public payload: any) { }
}
