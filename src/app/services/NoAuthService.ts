import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoAuthService {

  public constructor(private http: HttpClient) {

  }

  getTeams(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/noauth/getteams`);
  }
  getStatus(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/noauth/getstatus`);
  }

  getOwners(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/noauth/getowners`);
  }
}
