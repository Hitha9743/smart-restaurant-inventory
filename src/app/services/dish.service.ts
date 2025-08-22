import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';

@Injectable({ providedIn: 'root' })
export class DishService {
  private baseUrl = '/api/dishes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Dish[]> { return this.http.get<Dish[]>(this.baseUrl); }
  getById(id: number): Observable<Dish> { return this.http.get<Dish>(`${this.baseUrl}/${id}`); }

  create(payload: { dish: Dish }): Observable<string> {
  return this.http.post<string>(this.baseUrl, payload, { responseType: 'text' as 'json' });
}
update(id: number, payload: { dish: Dish}): Observable<string> {
  return this.http.put<string>(`${this.baseUrl}/${id}`, payload, { responseType: 'text' as 'json' });
}
delete(id: number): Observable<string> {
  return this.http.delete<string>(`${this.baseUrl}/${id}`, { responseType: 'text' as 'json' });
}
}
