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
}
