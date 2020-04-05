import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const API: string = environment.API;

@Injectable()
export class TaskService {

    constructor(private http: HttpClient) { }

    // 更改task状态
    changeTaskStatus(data: any): Observable<any> {
        return this.http.post(`${API}/task/status`, data);
    }

    // 更新任务
    updateTask(data: any): Observable<any> {
        return this.http.post(`${API}/task/update`, data);
    }

    // 删除task
    deleteTask(id: any): Observable<any> {
        return this.http.get(`${API}/task/delete?id=${id}`);
    }

    // 添加task
    addTask(data: any): Observable<any> {
        return this.http.post(`${API}/task/add`, data);
    }

    // 获取任务评论
    getTaskComment(taskId: any): Observable<any> {
        return this.http.get(`${API}/task/comment?taskId=${taskId}`);
    }

    // 添加任务评论
    addTaskComment(data: any): Observable<any> {
        return this.http.post(`${API}/task/comment/add`, data);
    }

    // 获取我负责的所有任务
    getMyTasks(): Observable<any> {
        return this.http.get(`${API}/task/myTask`);
    }
}

