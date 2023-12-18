import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private notificationService: NotificationService
  ) { }

  handleError(error: Error): void {
    this.notificationService.openSnackBar(error.message);
  }
}
