import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoAuthService } from 'src/app/services/NoAuthService';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/AdminService';
import { LeaderService } from 'src/app/services/LeaderSevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-leader',
  templateUrl: './add-user-leader.component.html',
  styleUrls: ['./add-user-leader.component.css']
})
export class AddUserLeaderComponent implements OnInit {

  newUserForm : FormGroup;
  teams : any ;
  levels: any = [];
  
  constructor(
    private fb : FormBuilder,
    private noAuthService : NoAuthService,
    private leaderService : LeaderService,
    private toastr : ToastrService,
    private adminService : AdminService,
    private router : Router
  ) { }

  ngOnInit() {
    this.init();
    this.getTeams();
    this.getLevel();
  }
  init(){
    this.newUserForm = this.fb.group(
    {
      username: ['',Validators.required],
      password: ['',Validators.required],
      re_password: ['',Validators.required],
      name: ['',Validators.required],
      adress: ['',Validators.required],
      phone_number: ['',Validators.required],
      gender: ['',Validators.required],
      mail: ['',Validators.required],
      level: [null,Validators.required],
      team_id : [null,Validators.required]
    }
  )
  }
  getTeams(){
    this.leaderService.getTeam().subscribe(data=>{
      this.teams =data.data;
    })
  }
  getLevel(){
    if(localStorage.getItem('level') === '3'){
      this.levels= [1,2,3] ;
    }else{
      this.levels = [1];
    }
  }
  submitCreate(){
    if(this.newUserForm.value.password === this.newUserForm.value.re_password){
      const body = 
      {
        username: this.newUserForm.value.username,
        password: this.newUserForm.value.password,
        name: this.newUserForm.value.name,
        adress: this.newUserForm.value.adress,
        phone_number:this.newUserForm.value.phone_number,
        gender: this.newUserForm.value.gender,
        mail: this.newUserForm.value.mail,
        level: this.newUserForm.value.level,
        team_id : this.newUserForm.value.team_id
      }
      this.adminService.addUser(body).subscribe(data=>{
        if(data.message==='new_user_has_been_added'){
          this.toastr.success(data.message);
          this.router.navigate(['leader']);
        }
        else{
          this.toastr.error(data.message);
        }
      })
    }else{
      this.toastr.error('Password didnt match');
    }
  }
}
