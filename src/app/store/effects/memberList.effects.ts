import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../service/user.service';
import { SocketService } from '../../service/socket.service';
import { MemberListActionTypes, LoadMemberListSuccess, LoadMemberListError } from '../actions';

@Injectable()
export class MemberEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private message: NzMessageService,
        private socketService: SocketService
    ) { }

    // 获取成员列表
    @Effect()
    memberData$ = this.actions$.pipe(
        ofType(MemberListActionTypes.LoadMemberList),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.userService.getMemberList(payload)
                .pipe(
                    map(res => {
                        if (res.code === 10000) {
                            return new LoadMemberListSuccess(res);
                        } else {
                            return of(new LoadMemberListError(res.msg));
                        }
                    }),
                    catchError(err => {
                        return of(new LoadMemberListError(err.message));
                    })
                ),
        )
    );
}
