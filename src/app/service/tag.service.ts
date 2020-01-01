import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API: string = environment.API;

@Injectable()
export class TagService {

    constructor(private http: HttpClient) { }

    addTag(data): Observable<any> {
        return this.http.post(`${API}/tag/add`, data);
    }
}

