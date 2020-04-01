import { finalize, tap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
    constructor(
        private message: NzMessageService,
        private notification: NzNotificationService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const started = Date.now();
        let ok: string;
        let secureReq;
        const token = localStorage.getItem('token') || '';
        if (req.url.split('/').pop() !== 'login') {
            secureReq = req.clone({
                setHeaders: {
                    'authorization': token,
                }
            });
        } else {
            secureReq = req.clone({});
        }

        return next.handle(secureReq)
            .pipe(
                tap(
                    event => ok = event instanceof HttpResponse ? 'succeeded' : '',
                    error => ok = 'failed'
                ),
                map(res => {
                    if (res instanceof HttpResponse) {
                        // token不存在或者token过期的情况重新登录
                        if (res.body.code === 301 || res.body.code === 302) {
                            this.notification.create('info', '请求错误', res.body.msg);
                            this.router.navigate(['/login']);
                        } else if (res.body.code !== 200 && res.body.code !== 301 && res.body.code !== 302) {
                            this.notification.create('error', '请求错误', res.body.msg.message);
                        }
                    }
                    return res;
                }),
                finalize(() => {
                    const elapsed = Date.now() - started;
                    const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
                    // console.log(msg);
                }),
                catchError(res => { // http请求的status不是200的时候触发
                    this.notification.create('error', '请求错误', res.error.msg);
                    return of(res);
                })
            );
    }
}
