import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponseModel } from '../models/search/search-response.model';
import { ISearch } from '../models/search/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3/';

  private headers = new HttpHeaders({
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) { }

  searchVideos(searchParams: ISearch): Observable<SearchResponseModel> {
    const { q, maxResults, order } = searchParams;
    const dataUrl = `${this.baseUrl}search?&part=snippet&type=video&maxResults=${maxResults || ''}&order=${order || 'relevance'}&q=${q || ''}`;
    return this.http
      .get<SearchResponseModel>(dataUrl, { headers: this.headers });
  }

  getVideos(id: string[]) {
    const dataUrl = `${this.baseUrl}videos?&part=snippet,statistics&type=video&id=${id.join(',') || ''}`;
    return this.http
      .get<SearchResponseModel>(dataUrl, { headers: this.headers });
  }
}
