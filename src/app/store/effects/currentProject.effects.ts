import { TagService } from '../../service/tag.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { ProjectService } from '../../service/project.service';
import { TaskService } from '../../service/task.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { CurrentProjectActionTypes, LoadCurrentProjectSuccess, LoadCurrentProjectError } from '../actions';


// effects 就是一个service  过滤出特定的action 进行相应的异步操作 得到结果后再dispatch相应的成功的action
@Injectable()
export class CurrentProjectEffects {

    constructor(
        private actions$: Actions,
        private notification: NzNotificationService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private tagService: TagService
    ) { }

    // 查询当前项目
    @Effect()
    projectDetailData$ = this.actions$.pipe(
        ofType(CurrentProjectActionTypes.LoadCurrentProject),
        map((data: any) => data.payload),
        mergeMap(projectId =>
            this.projectService.getProjectDetail(projectId)
                .pipe(
                    map(res => {
                        if (res.code === 200) {
                            return new LoadCurrentProjectSuccess(res);
                        } else {
                            return of(new LoadCurrentProjectError(res.msg));
                        }
                    }),
                    catchError(err => of(new LoadCurrentProjectError(err)))
                )
        )
    );

    // // 删除项目
    // @Effect()
    // deleteProjectData$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.DeleteProject),
    //     map((data: any) => data.payload),
    //     mergeMap(id =>
    //         this.projectService.deleteProject(id)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         this.notification.create('success', 'sucess', res.msg);
    //                         return new DeleteProjectSuccess(res);
    //                     } else {
    //                         return of(new DeleteProjectError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new DeleteProjectError(err)))
    //             )
    //     )
    // );
    // // 更新项目
    // @Effect()
    // updateProjectData$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.UpdateProject),
    //     map((data: any) => data.payload),
    //     mergeMap(updateData =>
    //         this.projectService.updateProject(updateData)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         this.notification.create('success', 'sucess', res.msg);
    //                         return new UpdateProjectSuccess(res);
    //                     } else {
    //                         return of(new UpdateProjectError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new UpdateProjectError(err)))
    //             )
    //     )
    // );

    // // 更改任务状态
    // @Effect()
    // changeTaskStatusData$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.ChangeTaskStatus),
    //     map((data: any) => data.payload),
    //     mergeMap(statusData =>
    //         this.taskService.changeTaskStatus(statusData)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         this.notification.create('success', 'sucess', res.msg);
    //                         return new ChangeTaskStatusCuccess(statusData);
    //                     } else {
    //                         return of(new ChangeTaskStatusError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new ChangeTaskStatusError(err)))
    //             )
    //     )
    // );

    // // 删除任务
    // @Effect()
    // deleteTaskStatusData$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.DeleteTask),
    //     map((data: any) => data.payload),
    //     mergeMap(id =>
    //         this.taskService.deleteTask(id)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         this.notification.create('success', 'sucess', res.msg);
    //                         return new DeleteTaskCuccess(res);
    //                     } else {
    //                         return of(new DeleteTaskError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new DeleteTaskError(err)))
    //             )
    //     )
    // );

    // // 获取任务评论
    // @Effect()
    // getTaskComment$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.GetTaskComment),
    //     map((data: any) => data.payload),
    //     mergeMap(taskId =>
    //         this.taskService.getTaskComment(taskId)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         // this.notification.create('success', 'sucess', res.msg);
    //                         return new GetTaskCommentSuccess({ res, taskId });
    //                     } else {
    //                         return of(new GetTaskCommentError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new GetTaskCommentError(err)))
    //             )
    //     )
    // );
    // // 添加任务评论
    // @Effect()
    // addTaskComment$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.AddTaskComment),
    //     map((data: any) => data.payload),
    //     mergeMap(comment =>
    //         this.taskService.addTaskComment(comment)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         // this.notification.create('success', 'sucess', res.msg);
    //                         return new AddTaskCommentSuccess(res);
    //                     } else {
    //                         return of(new AddTaskCommentError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new AddTaskCommentError(err)))
    //             )
    //     )
    // );
    // // 添加项目标签
    // @Effect()
    // addProjectTag$ = this.actions$.pipe(
    //     ofType(ProjectActionTypes.AddProjectTag),
    //     map((data: any) => data.payload),
    //     mergeMap(tag =>
    //         this.tagService.addTag(tag)
    //             .pipe(
    //                 map(res => {
    //                     if (res.code === 200) {
    //                         this.notification.create('success', 'sucess', res.msg);
    //                         return new AddProjectTagSuccess(res);
    //                     } else {
    //                         return of(new AddProjectTagError(res.msg));
    //                     }
    //                 }),
    //                 catchError(err => of(new AddProjectTagError(err)))
    //             )
    //     )
    // );
}
