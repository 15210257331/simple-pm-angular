import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API: string = environment.API;

@Injectable()
export class MessageService {

    constructor(private http: HttpClient) { }


    /**
     * 获取和选中好友的消息记录
     */
    getMessages(id: any): Observable<any> { // id 是选中好友的ID
        return this.http.get(`${API}/message/list?id=${id}`);
    }

}

