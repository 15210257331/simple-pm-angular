import { Action } from '@ngrx/store';

export enum ScheduleActionTypes {
    LoadScheduleList = 'LoadScheduleList',
    LoadScheduleSuccess = 'LoadScheduleSuccess',
    LoadScheduleError = 'LoadScheduleError',

    AddScheduleList = 'AddScheduleList',
    AddScheduleSuccess = 'AddScheduleSuccess',
    AddScheduleError = 'AddScheduleError',

    DeleteScheduleList = 'DeleteScheduleList',
    DeleteScheduleSuccess = 'DeleteScheduleSuccess',
    DeleteScheduleError = 'DeleteScheduleError',

    ResetSchedule = 'resetSchedule'
}

export class LoadScheduleList implements Action {
    readonly type = ScheduleActionTypes.LoadScheduleList;
}

export class LoadScheduleSuccess implements Action {
    readonly type = ScheduleActionTypes.LoadScheduleSuccess;
    constructor(public payload: any) {}
}

export class LoadScheduleError implements Action {
    readonly type = ScheduleActionTypes.LoadScheduleError;
    constructor(public payload: any) {}
}

export class AddScheduleList implements Action {
    readonly type = ScheduleActionTypes.AddScheduleList;
    constructor(public payload: any) {}
}

export class AddScheduleSuccess implements Action {
    readonly type = ScheduleActionTypes.AddScheduleSuccess;
    constructor(public payload: any) {}
}

export class AddScheduleError implements Action {
    readonly type = ScheduleActionTypes.AddScheduleError;
    constructor(public payload: any) {}
}

export class DeleteScheduleList implements Action {
    readonly type = ScheduleActionTypes.DeleteScheduleList;
    constructor(public payload: any) {}
}

export class DeleteScheduleSuccess implements Action {
    readonly type = ScheduleActionTypes.DeleteScheduleSuccess;
    constructor(public payload: any) {}
}

export class DeleteScheduleError implements Action {
    readonly type = ScheduleActionTypes.DeleteScheduleError;
    constructor(public payload: any) {}
}

export class ResetSchedule implements Action {
    readonly type = ScheduleActionTypes.ResetSchedule;
    constructor(public payload: any) {}
}


