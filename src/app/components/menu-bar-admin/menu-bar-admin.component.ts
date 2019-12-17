import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar-admin',
  templateUrl: './menu-bar-admin.component.html',
  styleUrls: ['./menu-bar-admin.component.css']
})
export class MenuBarAdminComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  moveToHome(){
    this.router.navigate(['admin']);
  }
  moveToCreate(){
    this.router.navigate(['admin-new-inspect']);
  }
  moveToSetLevel(){
    this.router.navigate(['admin-set-level']);
  }
  moveToAddUser(){
    this.router.navigate(['admin-add-user']);
  }
  moveToEditProfile(){
    this.router.navigate(['edit-profile']);
  }
}
