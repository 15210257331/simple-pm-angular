import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss']
})
export class FlipComponent implements OnInit {

  @Input() frontText: any = 0;

  @Input() backText: any = 1;

  @Input() duration = 600;

  isFlipping = false;

  frontTextFromData = 0;

  backTextFromData = 1;

  constructor() { }

  ngOnInit() {
    this.frontTextFromData = this.frontText;
    this.backTextFromData = this.backText;
  }

  private _textClass(num) {
    return 'number' + num;
  }
  _flip(type, front, back) {
    // 如果处于翻转中，则不执行
    if (this.isFlipping) {
      return false;
    }
    this.frontTextFromData = front;
    this.backTextFromData = back;
    // 设置翻转状态为true
    this.isFlipping = true;
    setTimeout(() => {
      // 设置翻转状态为false
      this.isFlipping = false;
      this.frontTextFromData = back;
    }, this.duration);
  }
  // 下翻牌
  flipDown(front, back) {
    this._flip('down', front, back);
  }
  // 上翻牌
  flipUp(front, back) {
    this._flip('up', front, back);
  }
  // 设置前牌文字
  setFront(text) {
    this.frontTextFromData = text;
  }
  // 设置后牌文字
  setBack(text) {
    this.backTextFromData = text;
  }

}
