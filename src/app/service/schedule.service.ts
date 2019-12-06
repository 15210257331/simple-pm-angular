import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const API: string = environment.API;

@Injectable()
export class ScheduleService {

    constructor(private http: HttpClient) { }


    /**
     * 获取日程列表
     */
    getScheduleList(): Observable<any> {
        return this.http.get(`${API}/schedule/list`);
    }

    /**
     * 新增日程
     */
    addSchedule(data: any): Observable<any> {
        return this.http.post(`${API}/schedule/add`, data);
    }

    /**
     * 删除日程
     */
    deleteSchedule(id: any): Observable<any> {
        return this.http.get(`${API}/schedule/delete?id=${id}`);
    }
}

