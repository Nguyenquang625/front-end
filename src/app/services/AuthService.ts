import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(private http: HttpClient) {

  }

  login(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/auth/login`, body);
  }

}
