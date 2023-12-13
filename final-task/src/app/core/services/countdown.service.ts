import { Injectable } from '@angular/core';
import {
  BehaviorSubject, Observable, map, switchMap, take, timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubject = new BehaviorSubject<number>(60);

  constructor() {}

  getTimer(): Observable<number> {
    return this.countdownSubject.asObservable();
  }

  start(): void {
    this.countdownSubject.pipe(
      take(1),
      switchMap((initialValue) => timer(0, 1000).pipe(
        map((tick) => initialValue - tick),
        take(initialValue + 1)
      ))
    ).subscribe((countdownValue) => {
      this.countdownSubject.next(countdownValue);
    });
  }

  reset(): void {
    this.countdownSubject.next(60);
  }
}
