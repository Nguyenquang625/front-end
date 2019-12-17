import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar-leader',
  templateUrl: './menu-bar-leader.component.html',
  styleUrls: ['./menu-bar-leader.component.css']
})
export class MenuBarLeaderComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  moveToHome(){
    this.router.navigate(['leader']);
  }
  moveToAddUser(){
    this.router.navigate(['add-user-leader']);
  }
}
