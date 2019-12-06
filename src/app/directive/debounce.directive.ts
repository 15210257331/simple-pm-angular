import { Directive, EventEmitter, HostListener, OnInit, Output, OnDestroy, Input } from '@angular/core';
import {Subject, Subscription,Observable,interval,fromEvent } from "rxjs";
import { map, take, debounceTime } from "rxjs/operators";

@Directive({
  selector: '[Debounce]'
})
export class DebounceDirective implements OnInit, OnDestroy {

  private clicks:Subject<any> = new Subject<any>();
  private subscription: Subscription;
  private _delayTime:number;

  @Input() set Debounce(val:number){
    this._delayTime = val;
  }
  @Output() debounceClick = new EventEmitter<any>();

  @HostListener('keyup', ['$event']) clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  constructor() { }

  ngOnInit() {
    this.subscription = this.clicks.pipe(debounceTime(this._delayTime)).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}