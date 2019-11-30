import { Pipe, PipeTransform } from '@angular/core';

// 将时间戳转化成 xx-xx-xx的格式
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
    constructor() { }

    transform(value: number | string) {
        if (value) {
            return new Date(value).toLocaleDateString().replace(/:\d{1,2}$/, ' ');
        }
    }
}
