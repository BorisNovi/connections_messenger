import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SearchResponseModel } from '../models/search/search-response.model';
import { SearchItemModel } from '../models/search/search-item.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeMockDataService {
  constructor(private http: HttpClient) {
  }

  private dataUrl = '../../../assets/mock_data/search-results.json';
  private dataUrlGhpages = 'assets/mock_data/search-results.json';

  getMockedData(): Observable<SearchResponseModel> {
    return this.http.get<SearchResponseModel>(this.dataUrlGhpages || this.dataUrl);
  }

  getMockedDataById(id: string): Observable<SearchItemModel[]> {
    return this.http.get<SearchResponseModel>(this.dataUrlGhpages || this.dataUrl).pipe(
      map((response) => response.items.filter((item) => item.id === id))
    );
  }
}
