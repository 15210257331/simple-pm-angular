import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
    LoadProjectList = 'LoadProjectList',
    LoadProjectListSuccess = 'LoadProjectListSuccess',
    LoadProjectListError = 'LoadProjectListError',

    AddProject = 'AddProject',
    AddProjectSuccess = 'AddProjectSuccess',
    AddProjectError = 'AddProjectError',

    UpdateProject = 'UpdateProject',
    UpdateProjectSuccess = 'UpdateProjectSuccess',
    UpdateProjectError = 'UpdateProjectError',

    DeleteProject = 'DeleteProject',
    DeleteProjectSuccess = 'DeleteProjectSuccess',
    DeleteProjectError = 'DeleteProjectError',

    LoadProjectDetail = 'LoadProjectDetail',
    LoadProjectDetailSuccess = 'LoadProjectDetailSuccess',
    LoadProjectDetailError = 'LoadProjectDetailError',

    AddTask = 'AddTask',
    AddTaskSuccess = 'AddTaskSuccess',
    AddTaskError = 'AddTaskSuccess',

    ChangeTaskStatus = 'changeTaskStatus',
    ChangeTaskStatusCuccess = 'changeTaskStatusCuccess',
    ChangeTaskStatusError = 'changeTaskStatusCuccess',

    DeleteTask = 'DeleteTask',
    DeleteTaskCuccess = 'DeleteTaskCuccess',
    DeleteTaskError = 'DeleteTaskError',

    GetTaskComment = 'GetTaskComment',
    GetTaskCommentSuccess = 'GetTaskCommentSuccess',
    GetTaskCommentError = 'GetTaskCommentError',

    AddTaskComment = 'AddTaskComment',
    AddTaskCommentSuccess = 'AddTaskCommentSuccess',
    AddTaskCommentError = 'AddTaskCommentError',

    AddProjectTag = 'AddProjectTag',
    AddProjectTagSuccess = 'AddProjectTagSuccess',
    AddProjectTagError = 'AddProjectTagError',

    ResetProject = 'ResetProject'

}

export class LoadProjectList implements Action {
    readonly type = ProjectActionTypes.LoadProjectList;
    constructor(public payload: any) { }
}

export class LoadProjectListSuccess implements Action {
    readonly type = ProjectActionTypes.LoadProjectListSuccess;
    constructor(public payload: any) { }
}

export class LoadProjectListError implements Action {
    readonly type = ProjectActionTypes.LoadProjectListError;
    constructor(public payload: any) { }
}

export class AddProject implements Action {
    readonly type = ProjectActionTypes.AddProject;
}

export class AddProjectSuccess implements Action {
    readonly type = ProjectActionTypes.AddProjectSuccess;
    constructor(public payload: any) { }
}

export class AddProjectError implements Action {
    readonly type = ProjectActionTypes.AddProjectError;
    constructor(public payload: any) { }
}

export class UpdateProject implements Action {
    readonly type = ProjectActionTypes.UpdateProject;
    constructor(public payload: any) { }
}
export class UpdateProjectSuccess implements Action {
    readonly type = ProjectActionTypes.UpdateProjectSuccess;
    constructor(public payload: any) { }
}
export class UpdateProjectError implements Action {
    readonly type = ProjectActionTypes.UpdateProjectError;
    constructor(public payload: any) { }
}

export class DeleteProject implements Action {
    readonly type = ProjectActionTypes.DeleteProject;
    constructor(public payload: any) { }
}
export class DeleteProjectSuccess implements Action {
    readonly type = ProjectActionTypes.DeleteProjectSuccess;
    constructor(public payload: any) { }
}
export class DeleteProjectError implements Action {
    readonly type = ProjectActionTypes.DeleteProjectError;
    constructor(public payload: any) { }
}

export class LoadProjectDetail implements Action {
    readonly type = ProjectActionTypes.LoadProjectDetail;
    constructor(public payload: any) { }
}

export class LoadProjectDetailSuccess implements Action {
    readonly type = ProjectActionTypes.LoadProjectDetailSuccess;
    constructor(public payload: any) { }
}

export class LoadProjectDetailError implements Action {
    readonly type = ProjectActionTypes.LoadProjectDetailError;
    constructor(public payload: any) { }
}

export class AddTask implements Action {
    readonly type = ProjectActionTypes.AddTask;
    constructor(public payload: any) { }
}

export class AddTaskSuccess implements Action {
    readonly type = ProjectActionTypes.AddTaskSuccess;
    constructor(public payload: any) { }
}

export class AddTaskError implements Action {
    readonly type = ProjectActionTypes.AddTaskError;
    constructor(public payload: any) { }
}

export class ChangeTaskStatus implements Action {
    readonly type = ProjectActionTypes.ChangeTaskStatus;
    constructor(public payload: any) { }
}

export class ChangeTaskStatusCuccess implements Action {
    readonly type = ProjectActionTypes.ChangeTaskStatusCuccess;
    constructor(public payload: any) { }
}

export class ChangeTaskStatusError implements Action {
    readonly type = ProjectActionTypes.ChangeTaskStatusError;
    constructor(public payload: string) { }
}
export class DeleteTask implements Action {
    readonly type = ProjectActionTypes.DeleteTask;
    constructor(public payload: string) { }
}
export class DeleteTaskCuccess implements Action {
    readonly type = ProjectActionTypes.DeleteTaskCuccess;
    constructor(public payload: any) { }
}
export class DeleteTaskError implements Action {
    readonly type = ProjectActionTypes.DeleteTaskError;
    constructor(public payload: any) { }
}

export class GetTaskComment implements Action {
    readonly type = ProjectActionTypes.GetTaskComment;
    constructor(public payload: any) { }
}
export class GetTaskCommentSuccess implements Action {
    readonly type = ProjectActionTypes.GetTaskCommentSuccess;
    constructor(public payload: any) { }
}
export class GetTaskCommentError implements Action {
    readonly type = ProjectActionTypes.GetTaskCommentError;
    constructor(public payload: any) { }
}

export class AddTaskComment implements Action {
    readonly type = ProjectActionTypes.AddTaskComment;
    constructor(public payload: any) { }
}
export class AddTaskCommentSuccess implements Action {
    readonly type = ProjectActionTypes.AddTaskCommentSuccess;
    constructor(public payload: any) { }
}
export class AddTaskCommentError implements Action {
    readonly type = ProjectActionTypes.AddTaskCommentError;
    constructor(public payload: any) { }
}


export class AddProjectTag implements Action {
    readonly type = ProjectActionTypes.AddProjectTag;
    constructor(public payload: any) { }
}
export class AddProjectTagSuccess implements Action {
    readonly type = ProjectActionTypes.AddProjectTagSuccess;
    constructor(public payload: any) { }
}

export class AddProjectTagError implements Action {
    readonly type = ProjectActionTypes.AddProjectTagError;
    constructor(public payload: any) { }
}

export class ResetProject implements Action {
    readonly type = ProjectActionTypes.ResetProject;
    constructor(public payload: any) { }
}


