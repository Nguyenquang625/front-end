import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/AdminService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-level',
  templateUrl: './set-level.component.html',
  styleUrls: ['./set-level.component.css']
})
export class SetLevelComponent implements OnInit {
  members: any =[];
  name : string ;

  
  constructor(
    private adminService : AdminService,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.getMembers();
  }
  getMembers(){
    this.adminService.getAllMembers().subscribe(data=>{
      if(data.message === 'get_all_members_successs'){
        this.members = data.data;
      }
    });
  }

  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login']);
    }
  }

  setAdmin($event){
    this.adminService.setAdmin($event).subscribe(data=>{
      if(data.message === 'set_admin_success'){
        this.members.map( member => {
          if(member.id == $event.id){
            member.level = data.data.level;
          }
        });
        this.toastr.success(data.message);
      }else{
        this.toastr.error(data.message, 'Error')
      }
    })
  }
  setOwner($event){
    this.adminService.setOwner($event).subscribe(data=>{
      if(data.message === 'set_owner_success'){
        this.members.map( member => {
          if(member.id == $event.id){
            member.level = data.data.level;
          }
        });
        this.toastr.success(data.message);
      }else{
        this.toastr.error(data.message, 'Error')
      }
    })
  }
  setMember($event){
    this.adminService.setMember($event).subscribe(data=>{
      if(data.message === 'account_has_been_banned'){
        this.members.map( member => {
          if(member.id == $event.id){
            member.level = data.data.level;
          }
        });
        this.toastr.success(data.message);
      }else{
        this.toastr.error(data.message, 'Error')
      }
    })
  }
  setBan($event){
    this.adminService.setBan($event).subscribe(data=>{
      if(data.message === 'account_has_been_banned'){
        this.members.map( member => {
          if(member.id == $event.id){
            member.level = data.data.level;
          }
        });
        this.toastr.success(data.message);
      }else{
        this.toastr.error(data.message, 'Error')
      }
    })
  }
  setUnban($event){
    this.adminService.setUnban($event).subscribe(data=>{
      if(data.message === 'account_has_been_unbanned'){
        this.members.map( member => {
          if(member.id == $event.id){
            member.level = data.data.level;
          }
        });
        this.toastr.success(data.message);
      }else{
        this.toastr.error(data.message, 'Error')
      }
    })
  }
}
