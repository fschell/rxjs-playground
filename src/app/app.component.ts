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
    const interval$ = Observable.interval(1000);

    const subscription = interval$
      .do( (val) => console.log('do  ' + val))      // 0--1---2---3---4---5---6---7...
      .pipe(
        skip(1),                              // ---1---2---3---4---5---6---7...
        take(5),                              // ---1---2---3---4---5|
        tap( v => console.log('tap ' + v)),
        filter(v => v % 2 === 0),         // -------2-------4|
        map( v => v + 10)                   // -------12------14|
      )
      .subscribe( v => console.log('sub ' + v));

    this.subscriptions.push(subscription);
  }
  ngOnDestroy() {
    // when the component get's destroyed, unsubscribe all the subscriptions
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }
}
