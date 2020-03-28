import { Action } from '@ngrx/store';

export enum MemberListActionTypes {

    LoadMemberList = 'LoadMemberList',
    LoadMemberListSuccess = 'LoadMemberListSuccess',
    LoadMemberListError = 'LoadMemberListError',

    AddMemberSuccess = 'AddMember',
    AddMemberError = 'AddMemberError',

    DeleteMemberSuccess = 'DeleteMemberSuccess',
    DeleteMemberError = 'DeleteMemberError',

    ResetMemberList = 'ResetMemberList'
}

export class LoadMemberList implements Action {
    readonly type = MemberListActionTypes.LoadMemberList;
    constructor(public payload: any) { }
}

export class LoadMemberListSuccess implements Action {
    readonly type = MemberListActionTypes.LoadMemberListSuccess;
    constructor(public payload: any) { }
}

export class LoadMemberListError implements Action {
    readonly type = MemberListActionTypes.LoadMemberListError;
    constructor(public payload: any) { }
}

export class AddMemberSuccess implements Action {
    readonly type = MemberListActionTypes.AddMemberSuccess;
    constructor(public payload: any) { }
}

export class AddMemberError implements Action {
    readonly type = MemberListActionTypes.AddMemberError;
    constructor(public payload: any) { }
}

export class DeleteMemberSuccess implements Action {
    readonly type = MemberListActionTypes.DeleteMemberSuccess;
    constructor(public payload: any) { }
}

export class DeleteMemberError implements Action {
    readonly type = MemberListActionTypes.DeleteMemberError;
    constructor(public payload: any) { }
}

export class ResetMemberList implements Action {
    readonly type = MemberListActionTypes.ResetMemberList;
    constructor(public payload: any) { }
}

