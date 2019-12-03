import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/MemberService';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  name : string ;
  workDetails : any = [];
  constructor(
    private router : Router,
    private memberService : MemberService
  ) { }

  ngOnInit() {
    this.checkLogin();
    this.checkAuth();
    this.name = localStorage.getItem('name');
  }
  checkLogin(){
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login'])
    }
  }
  checkAuth(){
    if(localStorage.getItem('level') === '3'){
      this.router.navigate(['admin']);
    }
    if(localStorage.getItem('level') === '2'){
      this.router.navigate(['leader']);
    }
    if(localStorage.getItem('level') === '1'){
      this.router.navigate(['member']);
    }
  }
  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login']);
    }
  }
}
