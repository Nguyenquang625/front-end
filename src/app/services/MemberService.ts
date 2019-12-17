import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  public constructor(private http: HttpClient) {

  }
  setHeaders():HttpHeaders{
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if(token){
     headers = headers.append('Authorization', token);
    }
    return headers;
  }
  getWorkDetails(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/member/getworkdetails`, {
      headers: this.setHeaders()
    });
  }
  getInspections(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/member/getinspections`, {
      headers: this.setHeaders()
    });
  }
  editWorkDetail(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/member/editworkdetail`,body, {
      headers: this.setHeaders()
    });
  }
  addWorkNotify(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/member/addworknotify`,body, {
      headers: this.setHeaders()
    });
  }
}
