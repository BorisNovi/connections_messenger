import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { environment } from 'src/environments/environment.development';
import { IPeopleMessagesResponse } from '../models/people-chat-messages-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPeopleChatService {
  private baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private localService: LocalService,
  ) { }

  private createHeaders(): HttpHeaders {
    const rsUid = this.localService.getData('uid');
    const rsEmail = this.localService.getData('email');
    const token = this.localService.getData('token');

    if (!rsUid || !rsEmail || !token) {
      throw new Error('Not all required data is available!');
    }

    return new HttpHeaders({
      'rs-uid': rsUid,
      'rs-email': rsEmail,
      Authorization: `Bearer ${token}`
    });
  }

  getPeopleMessages(conversationID: string, since = 0): Observable<IPeopleMessagesResponse> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/conversations/read?conversationID=${conversationID}&since=${since}`;

    return this.http.get<IPeopleMessagesResponse>(dataUrl, { headers });
  }

  sendPeopleMessage(conversationID: string, message: string): Observable<void> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/conversations/append`;
    const body = { conversationID, message };

    return this.http.post<void>(dataUrl, body, { headers });
  }

  deleteConversation(conversationID: string): Observable<void> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/conversations/delete?conversationID=${conversationID}`;

    return this.http.delete<void>(dataUrl, { headers });
  }
}
