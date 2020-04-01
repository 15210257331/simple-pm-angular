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
}
