import { Action } from '@ngrx/store';

export enum ProjectListActionTypes {
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

    ResetProjectList = 'ResetProjectList'

}

export class LoadProjectList implements Action {
    readonly type = ProjectListActionTypes.LoadProjectList;
    constructor(public payload: any) { }
}

export class LoadProjectListSuccess implements Action {
    readonly type = ProjectListActionTypes.LoadProjectListSuccess;
    constructor(public payload: any) { }
}

export class LoadProjectListError implements Action {
    readonly type = ProjectListActionTypes.LoadProjectListError;
    constructor(public payload: any) { }
}

export class AddProject implements Action {
    readonly type = ProjectListActionTypes.AddProject;
    constructor(public payload: any) { }
}

export class AddProjectSuccess implements Action {
    readonly type = ProjectListActionTypes.AddProjectSuccess;
    constructor(public payload: any) { }
}

export class AddProjectError implements Action {
    readonly type = ProjectListActionTypes.AddProjectError;
    constructor(public payload: any) { }
}

export class UpdateProject implements Action {
    readonly type = ProjectListActionTypes.UpdateProject;
    constructor(public payload: any) { }
}
export class UpdateProjectSuccess implements Action {
    readonly type = ProjectListActionTypes.UpdateProjectSuccess;
    constructor(public payload: any) { }
}
export class UpdateProjectError implements Action {
    readonly type = ProjectListActionTypes.UpdateProjectError;
    constructor(public payload: any) { }
}

export class DeleteProject implements Action {
    readonly type = ProjectListActionTypes.DeleteProject;
    constructor(public payload: any) { }
}
export class DeleteProjectSuccess implements Action {
    readonly type = ProjectListActionTypes.DeleteProjectSuccess;
    constructor(public payload: any) { }
}
export class DeleteProjectError implements Action {
    readonly type = ProjectListActionTypes.DeleteProjectError;
    constructor(public payload: any) { }
}

export class ResetProjectList implements Action {
    readonly type = ProjectListActionTypes.ResetProjectList;
    constructor(public payload: any) { }
}


