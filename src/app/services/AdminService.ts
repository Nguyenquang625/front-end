import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  getInspectation(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/admin/getinspection`,{
      headers:this.setHeaders()
    });
  }
  updateInspec(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/admin/updateinspect`,body, {
      headers: this.setHeaders()
    });
  }
  deleteInspec(inspection): Observable<any> {
    return this.http.delete(`${environment.API_SERVER_URL}/admin/deleteinspect/${inspection.id}`,{
      headers: this.setHeaders()
    });
  }
  getOwnerInfro(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/admin/getallmanager`, {
      headers: this.setHeaders()
    });
  }
  getAllMembers(): Observable<any> {
    return this.http.get(`${environment.API_SERVER_URL}/admin/getallmembers`, {
      headers: this.setHeaders()
    });
  }
  createNewInspectation(body): Observable<any> {
    return this.http.post(`${environment.API_SERVER_URL}/admin/insertinspect`,body, {
      headers: this.setHeaders()
    });
  }
  setAdmin(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/admin/setadmin`,body, {
      headers: this.setHeaders()
    });
  }
  setOwner(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/admin/setowner`,body, {
      headers: this.setHeaders()
    });
  }
  setMember(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/admin/setmember`,body, {
      headers: this.setHeaders()
    });
  }
  setBan(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/admin/banaccount`,body, {
      headers: this.setHeaders()
    });
  }
  setUnban(body): Observable<any> {
    return this.http.put(`${environment.API_SERVER_URL}/admin/unbanaccount`,body, {
      headers: this.setHeaders()
    });
  }
  getInspectionByTitle(searchInfo): Observable<any> {
    const query = `title=${searchInfo.title}&line_location=${searchInfo.line_location}&line_condition=${searchInfo.line_condition}`;
    return this.http.get(`${environment.API_SERVER_URL}/admin/getinspectionbytitle?${query}`, {
      headers: this.setHeaders()
    });
  }
}
