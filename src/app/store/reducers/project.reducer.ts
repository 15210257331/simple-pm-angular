import { Action } from '@ngrx/store';
import { ProjectActionTypes } from '../actions';

export interface ProjectAction extends Action {
    type: string;
    payload: any;
}

export interface Project {
    _id: string;
    name: string;
    content: string;
    creater: any;
    cover: '';
    member: any[];
    createDate: any;
}

export interface Task {
    _id: string;
    name: string;
    content: string;
    startTime: any;
    endTime: any;
    status: number;
    tag: any[];
    comment: any[];
    principal: any;
}

export interface ProjectDetail {
    _id: string;
    name: string;
    content: string;
    creater: any;
    member: any[];
    cover: '';
    createDate: any;
    task: Array<Task>;
    tag: Array<any>;
}

// project interface
export interface ProjectState {
    projectList: Array<Project>;
    projectDetail: ProjectDetail;
}

export const initialState: ProjectState = {
    projectList: [],
    projectDetail: {
        _id: '',
        name: '',
        content: '',
        creater: null,
        member: [],
        cover: '',
        createDate: null,
        task: [],
        tag: [],
    }
};

export function projectReducer(state: ProjectState = initialState, action: ProjectAction) {
    switch (action.type) {
        case ProjectActionTypes.LoadProjectListSuccess:
            state.projectList = action.payload.data;
            return state;

        case ProjectActionTypes.AddProjectSuccess:
            state.projectList.unshift(action.payload.data);
            return state;

        case ProjectActionTypes.UpdateProjectSuccess:
            state.projectList.map(item => {
                if (item._id === action.payload.data._id) {
                    item.name = action.payload.data.name;
                    item.content = action.payload.data.content;
                    item.cover = action.payload.data.cover;
                }
            });
            // state.projectDetail.name = action.payload.data.name;
            // state.projectDetail.content = action.payload.data.content;
            // state.projectDetail.member = action.payload.data.member;
            return state;

        case ProjectActionTypes.DeleteProjectSuccess:
            let deleteProjectIndex;
            state.projectList.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteProjectIndex = index;
                }
            });
            state.projectList.splice(deleteProjectIndex, 1);
            return state;

        case ProjectActionTypes.LoadProjectDetailSuccess:
            const projectDetail = action.payload.data;
            state.projectDetail = {
                _id: projectDetail._id,
                name: projectDetail.name,
                content: projectDetail.content,
                creater: projectDetail.creater,
                member: projectDetail.member,
                cover: projectDetail.cover,
                createDate: projectDetail.createDate,
                task: projectDetail.task,
                tag: projectDetail.tag
            };
            return state;

        case ProjectActionTypes.AddTaskSuccess:
            state.projectDetail.task.unshift(action.payload.data);
            return state;

        case ProjectActionTypes.ChangeTaskStatusCuccess:
            state.projectDetail.task.map(item => {
                if (item._id === action.payload._id) {
                    item.status = action.payload.status;
                }
            });
            return state;

        case ProjectActionTypes.DeleteTaskCuccess:
            let deleteIndex;
            state.projectDetail.task.map((item, index) => {
                if (item._id === action.payload.data) {
                    deleteIndex = index;
                }
            });
            state.projectDetail.task.splice(deleteIndex, 1);
            return state;

        case ProjectActionTypes.GetTaskCommentSuccess:
            state.projectDetail.task.map((item, index) => {
                if (item._id === action.payload.taskId) {
                    state.projectDetail.task[index].comment = action.payload.res.data;
                }
            });
            return state;

        case ProjectActionTypes.AddTaskCommentSuccess:
            state.projectDetail.task.map((item, index) => {
                if (item._id === action.payload.data.taskId) {
                    state.projectDetail.task[index].comment.push(action.payload.data);
                }
            });
            return state;

        case ProjectActionTypes.AddProjectTagSuccess:
            state.projectDetail.tag.push(action.payload.data);
            return state;

        case ProjectActionTypes.ResetProject:
            state.projectList = [];
            state.projectDetail = {
                _id: '',
                name: '',
                content: '',
                creater: null,
                member: [],
                cover: '',
                createDate: null,
                task: [],
                tag: [],
            };
            return state;

        default:
            return state;
    }
}
