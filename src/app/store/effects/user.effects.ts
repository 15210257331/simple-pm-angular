import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { UserActionTypes, LoadUserInfoSuccess, LoadUserInfoError, LoadMemberListSuccess, LoadMemberListError, DeleteMemberSuccess, DeleteMemberError, LoadRoleListError, LoadRoleListSuccess, } from '../actions';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../service/user.service';
import { SocketService } from '../../service/socket.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private message: NzMessageService,
        private socketService: SocketService
    ) { }

    // 获取用户信息
    @Effect()
    userInfo$ = this.actions$.pipe(
        ofType(UserActionTypes.LoadUserInfo),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.userService.getUserInfo()
                .pipe(
                    map(res => {
                        if (res.code === 200) {
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

    // 获取成员列表
    @Effect()
    memberData$ = this.actions$.pipe(
        ofType(UserActionTypes.LoadMemberList),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.userService.getMemberList()
                .pipe(
                    map(res => {
                        if (res.code === 200) {
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

    // 删除成员
    @Effect()
    deleteMemberData$ = this.actions$.pipe(
        ofType(UserActionTypes.DeleteMember),
        map((data: any) => data.payload),
        mergeMap((id) =>
            this.userService.deleteMember(id)
                .pipe(
                    map(res => {
                        if (res.code === 200) {
                            return new DeleteMemberSuccess(res);
                        } else {
                            return of(new DeleteMemberError(res.msg));
                        }
                    }),
                    catchError(err => {
                        return of(new DeleteMemberError(err.message));
                    })
                ),
        )
    );

    // 获取角色列表
    @Effect()
    roleData$ = this.actions$.pipe(
        ofType(UserActionTypes.LoadRoleList),
        map((data: any) => data.payload),
        mergeMap((payload) =>
            this.userService.getRoleList()
                .pipe(
                    map(res => {
                        if (res.code === 200) {
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
