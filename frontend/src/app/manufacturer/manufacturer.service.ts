import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from './manufacturer';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  addManufacturer(manufacturer: Manufacturer): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/manufacturer/create`,
        manufacturer,
        this.httpOptions
      );
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(`${environment.apiUrl}/manufacturer`);
  }
}
