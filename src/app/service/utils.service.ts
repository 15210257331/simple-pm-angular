import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    constructor() { }

    /**
  * 树型数据结果转化成数组
  * 数据结构包含子树表示符为childName
  * @param tree 
  */
    treeToList(tree, childName: string) {
        var queen = [];
        var out = [];
        queen = queen.concat(tree);
        while (queen.length) {
            var first = queen.shift();
            if (first[childName]) {
                queen = queen.concat(first[childName]);
                delete first['childName'];
            }
            out.push(first);
        }
        return out;
    }

    getLocalData(name: string) {
        return JSON.parse(localStorage.getItem(name));
    }

    setLocalData(name, content) {
        localStorage.setItem(name, JSON.stringify(content));
    }
}
