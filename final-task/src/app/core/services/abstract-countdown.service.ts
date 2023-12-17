import {
  BehaviorSubject, Observable, map, switchMap, take, tap, timer
} from 'rxjs';

export abstract class CountdownService {
  private countdownSubjectT1 = new BehaviorSubject<number>(60);

  constructor() {}

  getTimerT1(): Observable<number> {
    return this.countdownSubjectT1.asObservable();
  }

  startT1(): Observable<number> {
    return this.countdownSubjectT1.pipe(
      take(1),
      switchMap((initialValue) => timer(0, 1000).pipe(
        map((tick) => initialValue - tick),
        take(initialValue + 1)
      )),
      tap((countdownValue) => this.countdownSubjectT1.next(countdownValue))
    );
  }

  resetT1(): void {
    this.countdownSubjectT1.next(60);
  }
}
