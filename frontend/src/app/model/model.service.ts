import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from './model';
import * as io from 'socket.io-client';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private socket;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  addModel(model: Model): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/model/create`, model, this.httpOptions);
  }

  newModel(addmodel) {
    this.socket.emit('add-model', addmodel);
  }

  getModel() {
    const observable = new Observable(observer => {
      this.socket = io(environment.socketUrl);
      this.socket.on('addmodel', (model: Model) => {
        observer.next(model);
      });
    });
    return observable;
  }

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${environment.apiUrl}/model`);
  }

  sellModel(model: Model): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/model/sell`, model, this.httpOptions);
  }

  soldModel(sellmodel) {
    this.socket.emit('sell-model', sellmodel);
  }

  getSold() {
    const observable = new Observable(observer => {
      this.socket = io(environment.socketUrl);
      this.socket.on('sellmodel', (model: Model) => {
        observer.next(model);
      });
    });
    return observable;
  }

  uploadImage(formdata: any) {
    return this.http.post(`${environment.apiUrl}/model/upload`, formdata);
  }

  deleteImage(Image: any) {
    return this.http.post(`${environment.apiUrl}/model/deletefile`, Image);
  }
}
