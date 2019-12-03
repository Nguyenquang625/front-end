import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderService } from 'src/app/services/LeaderSevice';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {
  listInspections : any = [];
  name : string ;

  constructor(
    private router: Router,
    private leaderService: LeaderService
  ) { }

  ngOnInit() {
    this.checkLogin();
    this.checkAuth();
    this.getInsL();
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
  getInsL(){
    this.leaderService.getOwnerInfo().subscribe(data=>{
      if(data.message === 'get_ins_matched'){
        this.listInspections = data.data[0];
      }
    })
  }
  moveToMemberChat(){
    this.router.navigate(['member-chat']);
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
