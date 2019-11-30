import { ScheduleService } from './../../service/schedule.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { UserActionTypes, LoadUserInfoSuccess, LoadUserInfoError, LoadMemberListSuccess, LoadMemberListError, } from '../actions';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../service/user.service';
import { ScheduleActionTypes, LoadScheduleSuccess, LoadScheduleError, DeleteScheduleError, DeleteScheduleSuccess } from '../actions/schedule.action';

@Injectable()
export class ScheduleEffects {

    constructor(
        private actions$: Actions,
        private scheduleService: ScheduleService,
        private message: NzMessageService
    ) { }


    @Effect()
    scheduleInfo$ = this.actions$.pipe(
        ofType(ScheduleActionTypes.LoadScheduleList),
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
        ofType(ScheduleActionTypes.DeleteScheduleList),
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
