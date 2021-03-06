import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

// const API: string = environment.API;

const API = 'http://127.0.0.1:4000';

@Injectable()
export class SocketService {

    socket: any;

    constructor(private http: HttpClient) {
        this.socket = io(API);
        this.socket.on('disconnect', (data) => {
            console.log('websocket 断开连接');
        });
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

