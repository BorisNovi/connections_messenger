import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { environment } from 'src/environments/environment.development';
import { IConversationResponse, IPeopleListResponse } from '../models/people-list-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPeopleListService {
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

  getUsersList(): Observable<IPeopleListResponse> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/users`;
    return this.http.get<IPeopleListResponse>(dataUrl, { headers });
  }

  getConversationList(): Observable<IConversationResponse> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/conversations/list`;
    return this.http.get<IConversationResponse>(dataUrl, { headers });
  }

  createConversation(companion: string): Observable<{ conversationID: string }> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/conversations/create`;
    const body = { companion };
    return this.http.post<{ conversationID: string }>(dataUrl, body, { headers });
  }
}
