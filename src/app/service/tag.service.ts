import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API: string = environment.API;

@Injectable()
export class TagService {

    constructor(private http: HttpClient) { }

    // 更改task状态
    getTagList(): Observable<any> {
        return this.http.get(`${API}/tag/list`);
    }
}

