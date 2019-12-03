import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

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
  getOwnerInfo(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/owner/getmatchins`, {
      headers: this.setHeaders()
    });
  }
  getMembers(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/owner/getallteammembers`, {
      headers: this.setHeaders()
    });
  }
  addWorkDetail(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/owner/addworkdetail`,body, {
      headers: this.setHeaders()
    });
  }
  getWorkDetailsByInspectionId(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/owner/getworkwdetailsbyinspectionid`,body, {
      headers: this.setHeaders()
    });
  }
}
