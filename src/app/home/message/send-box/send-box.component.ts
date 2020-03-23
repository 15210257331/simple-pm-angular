import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-send-box',
  templateUrl: './send-box.component.html',
  styleUrls: ['./send-box.component.scss']
})
export class SendBoxComponent implements OnInit {

  message = '';

  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  send() {
    this.sendMessage.emit(this.message);
    this.message = '';
  }

}
