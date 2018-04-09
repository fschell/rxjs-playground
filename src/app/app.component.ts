import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxJs';
import {tap, skip, take, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptions = [];

  ngOnInit() {
    // The following stream will produce values every second
    // 0--1--2--3--4--5--6--...
    const interval$ = new Observable.interval(1000);
    // Even when this component gets destroyed,
    // the stream will keep producing values...
    // This means the console will keep on logging
    // This is a classic example of a memory-leak
    const subscription = interval$
      .do( (val) => console.log('do  ' + val))
      .pipe(
        skip(1),
        take(5),
        tap( v => console.log('tap ' + v)),
        filter(v => v % 2 === 0),
        map( v => v + 1)
      )
      .subscribe( v => console.log('sub ' + v));

    this.subscriptions.push(subscription);
  }
  ngOnDestroy() {
    // when the component get's destroyed, unsubscribe all the subscriptions
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }
}
