import {
  BehaviorSubject, Observable, map, switchMap, take, tap, timer
} from 'rxjs';

export abstract class CountdownService {
  private countdownSubject = new BehaviorSubject<number>(60);

  constructor() {}

  getTimer(): Observable<number> {
    return this.countdownSubject.asObservable();
  }

  start(): Observable<number> {
    return this.countdownSubject.pipe(
      take(1),
      switchMap((initialValue) => timer(0, 1000).pipe(
        map((tick) => initialValue - tick),
        take(initialValue + 1)
      )),
      tap((countdownValue) => this.countdownSubject.next(countdownValue))
    );
  }

  reset(): void {
    this.countdownSubject.next(60);
  }
}
