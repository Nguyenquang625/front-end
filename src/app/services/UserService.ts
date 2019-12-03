import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient) {

  }

  getInfo(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/auth/getInfo`);
  }
  insertUser(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/auth/insertUser`,body);
  }

}
