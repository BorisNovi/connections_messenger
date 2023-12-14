import { Injectable } from '@angular/core';
import {
  BehaviorSubject, Observable, map, switchMap, take, timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubjectT1 = new BehaviorSubject<number>(60);
  private countdownSubjectT2 = new BehaviorSubject<number>(60);

  constructor() {}

  getTimerT1(): Observable<number> {
    return this.countdownSubjectT1.asObservable();
  }

  getTimerT2(): Observable<number> {
    return this.countdownSubjectT2.asObservable();
  }

  startT1(): void {
    this.countdownSubjectT1.pipe(
      take(1),
      switchMap((initialValue) => timer(0, 1000).pipe(
        map((tick) => initialValue - tick),
        take(initialValue + 1)
      ))
    ).subscribe((countdownValue) => {
      this.countdownSubjectT1.next(countdownValue);
    });
  }

  startT2(): void {
    this.countdownSubjectT2.pipe(
      take(1),
      switchMap((initialValue) => timer(0, 1000).pipe(
        map((tick) => initialValue - tick),
        take(initialValue + 1)
      ))
    ).subscribe((countdownValue) => {
      this.countdownSubjectT2.next(countdownValue);
    });
  }

  resetT1(): void {
    this.countdownSubjectT1.next(60);
  }

  resetT2(): void {
    this.countdownSubjectT2.next(60);
  }
}
