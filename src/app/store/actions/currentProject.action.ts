import { Action } from '@ngrx/store';

export enum CurrentProjectActionTypes {

    LoadCurrentProject = 'LoadCurrentProject',
    LoadCurrentProjectSuccess = 'LoadCurrentProjectSuccess',
    LoadCurrentProjectError = 'LoadCurrentProjectError',

    AddTaskSuccess = 'AddTaskSuccess',
    AddTaskError = 'AddTaskSuccess',

    ChangeTaskStatusCuccess = 'changeTaskStatusCuccess',
    ChangeTaskStatusError = 'changeTaskStatusCuccess',

    DeleteTaskCuccess = 'DeleteTaskCuccess',
    DeleteTaskError = 'DeleteTaskError',

    GetTaskComment = 'GetTaskComment',
    GetTaskCommentSuccess = 'GetTaskCommentSuccess',
    GetTaskCommentError = 'GetTaskCommentError',

    AddTaskCommentSuccess = 'AddTaskCommentSuccess',
    AddTaskCommentError = 'AddTaskCommentError',

    AddProjectTagSuccess = 'AddProjectTagSuccess',
    AddProjectTagError = 'AddProjectTagError',

    ResetCurrentProject = 'ResetCurrentProject'

}


export class LoadCurrentProject implements Action {
    readonly type = CurrentProjectActionTypes.LoadCurrentProject;
    constructor(public payload: any) { }
}

export class LoadCurrentProjectSuccess implements Action {
    readonly type = CurrentProjectActionTypes.LoadCurrentProjectSuccess;
    constructor(public payload: any) { }
}

export class LoadCurrentProjectError implements Action {
    readonly type = CurrentProjectActionTypes.LoadCurrentProjectError;
    constructor(public payload: any) { }
}

export class AddTaskSuccess implements Action {
    readonly type = CurrentProjectActionTypes.AddTaskSuccess;
    constructor(public payload: any) { }
}

export class AddTaskError implements Action {
    readonly type = CurrentProjectActionTypes.AddTaskError;
    constructor(public payload: any) { }
}

export class ChangeTaskStatusCuccess implements Action {
    readonly type = CurrentProjectActionTypes.ChangeTaskStatusCuccess;
    constructor(public payload: any) { }
}

export class ChangeTaskStatusError implements Action {
    readonly type = CurrentProjectActionTypes.ChangeTaskStatusError;
    constructor(public payload: string) { }
}

export class DeleteTaskCuccess implements Action {
    readonly type = CurrentProjectActionTypes.DeleteTaskCuccess;
    constructor(public payload: any) { }
}

export class DeleteTaskError implements Action {
    readonly type = CurrentProjectActionTypes.DeleteTaskError;
    constructor(public payload: any) { }
}

export class GetTaskComment implements Action {
    readonly type = CurrentProjectActionTypes.GetTaskComment;
    constructor(public payload: any) { }
}

export class GetTaskCommentSuccess implements Action {
    readonly type = CurrentProjectActionTypes.GetTaskCommentSuccess;
    constructor(public payload: any) { }
}

export class GetTaskCommentError implements Action {
    readonly type = CurrentProjectActionTypes.GetTaskCommentError;
    constructor(public payload: any) { }
}

export class AddTaskCommentSuccess implements Action {
    readonly type = CurrentProjectActionTypes.AddTaskCommentSuccess;
    constructor(public payload: any) { }
}
export class AddTaskCommentError implements Action {
    readonly type = CurrentProjectActionTypes.AddTaskCommentError;
    constructor(public payload: any) { }
}

export class AddProjectTagSuccess implements Action {
    readonly type = CurrentProjectActionTypes.AddProjectTagSuccess;
    constructor(public payload: any) { }
}

export class AddProjectTagError implements Action {
    readonly type = CurrentProjectActionTypes.AddProjectTagError;
    constructor(public payload: any) { }
}

export class ResetProject implements Action {
    readonly type = CurrentProjectActionTypes.ResetCurrentProject;
    constructor(public payload: any) { }
}


