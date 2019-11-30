import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../shared/config';

const API = config.api;

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    // 注册
    register(data: any): Observable<any> {
        return this.http.post(`${API}/user/register`, data);
    }

    // 登录
    login(data: any): Observable<any> {
        return this.http.post(`${API}/user/login`, data);
    }

    // 获取用户信息
    getUserInfo(): Observable<any> {
        return this.http.get(`${API}/user/info`);
    }

    // 获取用户信息
    getMemberList(): Observable<any> {
        return this.http.get(`${API}/user/member/list`);
    }

    // 更新用户信息
    updateUserInfo(data: any): Observable<any> {
        return this.http.post(`${API}/user/info/update`, data);
    }

    // 上传文件
    uploadImg(data: any): Observable<any>  {
        return this.http.post(`${API}/user/uploadImg`, data);
    }
}

