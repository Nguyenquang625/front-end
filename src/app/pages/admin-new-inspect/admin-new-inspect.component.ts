import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/AdminService';
import { NoAuthService } from 'src/app/services/NoAuthService';

@Component({
  selector: 'app-admin-new-inspect',
  templateUrl: './admin-new-inspect.component.html',
  styleUrls: ['./admin-new-inspect.component.css']
})
export class AdminNewInspectComponent implements OnInit {
  newInsForm : FormGroup;
  owners : any =[];
  teams : any = [];
  statuses: any = [];
  constructor(
    private router : Router,
    private fb : FormBuilder,
    private adminService : AdminService,
    private noAuthService : NoAuthService
  ) { }

  ngOnInit() {
    this.checkLogin();
  //  this.checkAuth();
    this.init();
    this.getManager();
    this.getTeams();
    this.getStatuses();
  }
  init(){
    this.newInsForm = this.fb.group(
      {
        title: [''],
        line_location: [''],
        line_condition: [''],
        description: [''],
        equipment_require: [''],
        team_id: [],
        start_date: [''],
        end_date: [''],
        status: [''],
        owner_id : []
      }
    )
  }
  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login']);
    }
  }
  // checkAuth(){
  //   if(localStorage.getItem('level') === '3'){
  //     this.router.navigate(['admin']);
  //   }
  //   if(localStorage.getItem('level') === '2'){
  //     this.router.navigate(['leader']);
  //   }
  //   if(localStorage.getItem('level') === '1'){
  //     this.router.navigate(['member']);
  //   }
  // }
  submitCreate(){
    const {title, status,line_location,line_condition,description,equipment_require, start_date
      ,end_date,team_id, owner_id}= this.newInsForm.value;
    const body = {
      title, status,line_location,line_condition,description,equipment_require, start_date
      ,end_date,team_id, owner_id
    }
    this.adminService.createNewInspectation(body).subscribe(data =>{
      if(data.message ==='insert_success'){
        this.router.navigate(['admin'])
      }
    })
  }
  getManager(){
    this.adminService.getOwnerInfro().subscribe(data=>{
      if(data.message === 'get_all_manager_success'){
        this.owners = data.data;
      }
    })
  }
  getTeams(){
    this.noAuthService.getTeams().subscribe(data=>{
      if(data.message === 'get_teams_sucess'){
        this.teams = data.data;
      }
    })
  }
  getStatuses(){
    this.noAuthService.getStatus().subscribe(data=>{
      if(data.message === 'get_status_sucess'){
        this.statuses = data.data;
      }
    })
  }
  checkLogin(){
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login']);
    }
  }
}
