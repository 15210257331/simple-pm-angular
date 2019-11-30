import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../shared/config';

const API = config.api;

@Injectable()
export class ProjectService {

    constructor(private http: HttpClient) { }


    /**
     * 获取project 列表
     */
    getProjectList(name: any): Observable<any> {
        return this.http.post(`${API}/project/list`, {name});
    }

    /**
     * 获取project 详情
     */
    getProjectDetail(id: string): Observable<any> {
        return this.http.get(`${API}/project/detail?_id=${id}`);
    }

    /**
     * 新增project
     */
    addProject(data: any): Observable<any> {
        return this.http.post(`${API}/project/add`, data);
    }

    /**
     * 删除project
     */
    deleteProject(id: any): Observable<any> {
        return this.http.get(`${API}/project/delete?id=${id}`);
    }
}

