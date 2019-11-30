import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { config } from '../shared/config';

const API = config.api;

@Injectable()
export class SocketService {

    socket: any;

    constructor(private http: HttpClient) {
        this.socket = io(API);
    }

    sendMessage(type: string, content: any) {
        this.socket.emit(type, content);
    }

    getMessage(type): Observable<any> {
        const observable = new Observable(observer => {
            this.socket.on(type, (data) => {
                observer.next(data);
            });
            // return () => {
            //     this.socket.disconnect();
            // };
        });
        return observable;
    }
}

