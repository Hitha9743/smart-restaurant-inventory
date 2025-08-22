import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WasteRecord } from '../models/waste.model';

@Injectable({ providedIn: 'root' })
export class WasteService {
  private baseUrl = '/api/waste';

  constructor(private http: HttpClient) {}

  getAll(): Observable<WasteRecord[]> {
    return this.http.get<WasteRecord[]>(this.baseUrl);
  }
  getRange(from: string, to: string): Observable<WasteRecord[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<WasteRecord[]>(`${this.baseUrl}/range`, { params });
  }
  getTotal(from: string, to: string): Observable<number> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<number>(`${this.baseUrl}/total`, { params });
  }

  create(rec: WasteRecord): Observable<string> {
  return this.http.post<string>(this.baseUrl, rec, { responseType: 'text' as 'json' });
}

update(id: number, rec: WasteRecord): Observable<string> {
  return this.http.put<string>(`${this.baseUrl}/${id}`, rec, { responseType: 'text' as 'json' });
}

delete(id: number): Observable<string> {
  return this.http.delete<string>(`${this.baseUrl}/${id}`, { responseType: 'text' as 'json' });
}


}
