import { ScheduleService } from '../../service/schedule.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../service/user.service';
import { ScheduleListActionTypes, LoadScheduleSuccess, LoadScheduleError, DeleteScheduleError, DeleteScheduleSuccess } from '../actions/scheduleList.action';

@Injectable()
export class ScheduleListEffects {

    constructor(
        private actions$: Actions,
        private scheduleService: ScheduleService,
        private message: NzMessageService
    ) { }

    // 加载日程
    @Effect()
    scheduleInfo$ = this.actions$.pipe(
        ofType(ScheduleListActionTypes.LoadScheduleList),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.scheduleService.getScheduleList()
                .pipe(
                    map(res => {
                        if (res.code === 200) {
                            return new LoadScheduleSuccess(res);
                        } else {
                            return of(new LoadScheduleError(res.msg));
                        }
                    }),
                    catchError(err => {
                        return of(new LoadScheduleError(err.message));
                    })
                ),
        )
    );

    // 删除日程
    @Effect()
    deleteScheduleInfo$ = this.actions$.pipe(
        ofType(ScheduleListActionTypes.DeleteScheduleList),
        map((data: any) => data.payload),
        mergeMap((id) =>
            this.scheduleService.deleteSchedule(id)
                .pipe(
                    map(res => {
                        if (res.code === 200) {
                            return new DeleteScheduleSuccess(res);
                        } else {
                            return of(new DeleteScheduleError(res.msg));
                        }
                    }),
                    catchError(err => {
                        return of(new DeleteScheduleError(err.message));
                    })
                ),
        )
    );
}
