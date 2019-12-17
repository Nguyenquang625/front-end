import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-chat',
  templateUrl: './member-chat.component.html',
  styleUrls: ['./member-chat.component.css']
})
export class MemberChatComponent implements OnInit {
  name: string;
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
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
