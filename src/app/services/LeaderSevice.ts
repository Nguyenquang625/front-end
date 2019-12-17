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
  updateProgress(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/owner/updateprogress`,body, {
      headers: this.setHeaders()
    });
  }
  getDataNotify(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/owner/getdatanotify`, {
      headers: this.setHeaders()
    });
  }
  sendReport(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/owner/sendreport`,body, {
      headers: this.setHeaders()
    });
  }
  getInspectionByMultiCondtion(searchInfo): Observable<any> {
    const query = `title=${searchInfo.title}&line_location=${searchInfo.line_location}&line_condition=${searchInfo.line_condition}`;
    return this.http.get(`${environment.API_SERVER_URL}/owner/getinspectionbymulticondtion?${query}`, {
      headers: this.setHeaders()
    });
  }
  getTeam(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/owner/getteam`, {
      headers: this.setHeaders()
    });
  }
}
