import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { RoleListActionTypes, LoadRoleListSuccess, LoadRoleListError, } from '../actions';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../service/user.service';
import { SocketService } from '../../service/socket.service';

@Injectable()
export class RoleListEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) { }

    // 获取角色列表
    @Effect()
    roleData$ = this.actions$.pipe(
        ofType(RoleListActionTypes.LoadRoleList),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.userService.getRoleList(payload)
                .pipe(
                    map(res => {
                        if (res.code === 10000) {
                            return new LoadRoleListSuccess(res);
                        } else {
                            return of(new LoadRoleListError(res.msg));
                        }
                    }),
                    catchError(err => {
                        return of(new LoadRoleListError(err.message));
                    })
                ),
        )
    );
}
