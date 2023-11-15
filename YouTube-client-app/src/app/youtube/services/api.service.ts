import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SearchResponseModel } from '../models/search/search-response.model';
import { SearchItemModel } from '../models/search/search-item.model';
import { ISearch, IGet } from '../models/search/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3/';
  private token = ''; // Можно добавить потом, если вязать вход в гугл-аккаунт с авторизацией.
  private API_KEY = 'AIzaSyD5ttr2lY939Ay2pavuSYygFZ_1dFVbfHg';
  private headers = new HttpHeaders({
    // Authorization: `Bearer ${this.token}`,
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) { }

  searchVideos(searchParams: ISearch): Observable<SearchResponseModel> {
    const { q, maxResults, order } = searchParams;
    const dataUrl = `${this.baseUrl}search?key=${this.API_KEY}&part=snippet&maxResults=${maxResults || ''}&order=${order || 'relevance'}&q=${q || ''}`;
    return this.http.get<SearchResponseModel>(dataUrl, { headers: this.headers });
  }

  getVideos(getParams: IGet) {
    const { maxResults, id } = getParams;
    const dataUrl = `${this.baseUrl}videos?key=${this.API_KEY}&part=snippet%2C%20statistics&maxResults=${maxResults || ''}&id=${id.join(',') || ''}`;
    return this.http.get<SearchResponseModel>(dataUrl, { headers: this.headers });
  }
}
