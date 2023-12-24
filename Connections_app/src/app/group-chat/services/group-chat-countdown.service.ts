import { Injectable } from '@angular/core';
import { CountdownService } from 'src/app/core/services/abstract-countdown.service';

@Injectable({
  providedIn: 'root'
})
export class GroupChatCountdownService extends CountdownService {
  constructor() {
    super();
  }
}
