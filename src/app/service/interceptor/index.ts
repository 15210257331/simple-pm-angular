import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest, HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import { LogInterceptor } from './http.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
];
