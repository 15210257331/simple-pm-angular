import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { ProjectService } from '../../service/project.service';
import { TaskService } from '../../service/task.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { ProjectListActionTypes, LoadProjectListSuccess, LoadProjectListError } from '../actions';


// effects 就是一个service  过滤出特定的action 进行相应的异步操作 得到结果后再dispatch相应的成功的action
@Injectable()
export class ProjectListEffects {

    constructor(
        private actions$: Actions,
        private notification: NzNotificationService,
        private projectService: ProjectService,
        private taskService: TaskService,
    ) { }

    // 项目列表
    @Effect()
    projectListData$ = this.actions$.pipe(
        ofType(ProjectListActionTypes.LoadProjectList),
        map((data: any) => data.payload),
        mergeMap(name =>
            this.projectService.getProjectList(name)
                .pipe(
                    map(res => {
                        if (res.code === 10000) {
                            return new LoadProjectListSuccess(res);
                        } else {
                            return new LoadProjectListError(res.msg);
                        }
                    }),
                    catchError(err => of(new LoadProjectListError(err)))
                )
        )
    );
}
