import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  // If you set a proxy later, change this to '/api/ingredients'
  private baseUrl = '/api/ingredients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl);
  }
  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.baseUrl}/${id}`);
  }
    create(payload: Ingredient): Observable<any> {
    return this.http.post(this.baseUrl, payload, { responseType: 'text' });
  }

  update(id: number, payload: Ingredient): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payload, { responseType: 'text'  });
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
