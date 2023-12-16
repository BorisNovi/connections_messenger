import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { environment } from 'src/environments/environment.development';
import { IGroupMessagesResponse } from '../models/group-chat-messages-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiGroupChatService {
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

  getGroupMessages(groupID: string, since = 0): Observable<IGroupMessagesResponse> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/groups/read?groupID=${groupID}&since=${since}`;

    return this.http.get<IGroupMessagesResponse>(dataUrl, { headers });
  }

  sendGroupMessage(groupID: string, message: string): Observable<void> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/groups/append`;
    const body = { groupID, message };

    return this.http.post<void>(dataUrl, body, { headers });
  }
}
