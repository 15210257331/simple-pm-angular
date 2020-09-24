import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { UserInfoActionTypes, LoadUserInfoSuccess, LoadUserInfoError } from '../actions';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../service/user.service';
import { SocketService } from '../../service/socket.service';

@Injectable()
export class UserInfoEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private message: NzMessageService,
        private socketService: SocketService
    ) { }

    // 获取用户信息
    @Effect()
    userInfo$ = this.actions$.pipe(
        ofType(UserInfoActionTypes.LoadUserInfo),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.userService.getUserInfo()
                .pipe(
                    map(res => {
                        if (res.code === 10000) {
                            this.socketService.sendMessage('setRemind', res.data._id);
                            return new LoadUserInfoSuccess(res);
                        } else {
                            return of(new LoadUserInfoError(res.msg));
                        }
                    }),
                    catchError(err => {
                        return of(new LoadUserInfoError(err.message));
                    })
                ),
        )
    );
}
