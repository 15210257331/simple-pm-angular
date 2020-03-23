import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API: string = environment.API;

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

    // 获取用户列表
    getMemberList(): Observable<any> {
        return this.http.get(`${API}/user/list`);
    }

    // 设置用户角色
    setMemberRole(data: any): Observable<any> {
        return this.http.post(`${API}/user/setMemberRole`, data);
    }

    // 更新用户信息
    updateUserInfo(data: any): Observable<any> {
        return this.http.post(`${API}/user/info/update`, data);
    }

    // 删除用户
    deleteMember(id: any): Observable<any> {
        return this.http.get(`${API}/user/delete?id=${id}`);
    }

    // 上传用户头像
    uploadImg(data: any): Observable<any> {
        return this.http.post(`${API}/user/uploadImg`, data);
    }

    // 获取角色列表
    getRoleList(): Observable<any> {
        return this.http.get(`${API}/role/list`);
    }

    // 添加角色
    addRole(data: any): Observable<any> {
        return this.http.post(`${API}/role/add`, data);
    }

    // 更新角色
    updateRole(data: any): Observable<any> {
        return this.http.post(`${API}/role/update`, data);
    }

    // 删除角色
    deleteRole(id: any): Observable<any> {
        return this.http.get(`${API}/role/delete?id=${id}`);
    }
}

