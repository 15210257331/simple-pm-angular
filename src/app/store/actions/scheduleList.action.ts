import { Action } from '@ngrx/store';

export enum ScheduleListActionTypes {
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
    readonly type = ScheduleListActionTypes.LoadScheduleList;
}

export class LoadScheduleSuccess implements Action {
    readonly type = ScheduleListActionTypes.LoadScheduleSuccess;
    constructor(public payload: any) {}
}

export class LoadScheduleError implements Action {
    readonly type = ScheduleListActionTypes.LoadScheduleError;
    constructor(public payload: any) {}
}

export class AddScheduleList implements Action {
    readonly type = ScheduleListActionTypes.AddScheduleList;
    constructor(public payload: any) {}
}

export class AddScheduleSuccess implements Action {
    readonly type = ScheduleListActionTypes.AddScheduleSuccess;
    constructor(public payload: any) {}
}

export class AddScheduleError implements Action {
    readonly type = ScheduleListActionTypes.AddScheduleError;
    constructor(public payload: any) {}
}

export class DeleteScheduleList implements Action {
    readonly type = ScheduleListActionTypes.DeleteScheduleList;
    constructor(public payload: any) {}
}

export class DeleteScheduleSuccess implements Action {
    readonly type = ScheduleListActionTypes.DeleteScheduleSuccess;
    constructor(public payload: any) {}
}

export class DeleteScheduleError implements Action {
    readonly type = ScheduleListActionTypes.DeleteScheduleError;
    constructor(public payload: any) {}
}

export class ResetSchedule implements Action {
    readonly type = ScheduleListActionTypes.ResetSchedule;
    constructor(public payload: any) {}
}


