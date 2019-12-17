import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SocketService from 'src/app/services/socketService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name : string;
  socket = SocketService.socket;
  token = localStorage.getItem('token');;
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    SocketService.emit('updateSocketId', this.token);
    this.checkLogin();
    this.name = localStorage.getItem('name');
  }

  checkLogin(){
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login'])
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
