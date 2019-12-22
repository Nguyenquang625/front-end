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
  filteredMembers: any =[];
  temporaryFilteredMembers: any =[];
  name : string ;
  
  dataSearch : any ={ name : ''}

  nameF : any ='';
  team_id: number;
  level: number;

  
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
        this.filteredMembers = data.data;
        this.temporaryFilteredMembers = data.data;
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
  updateMemberList(data){
    this.members.map( member => {
      if(member.id == data.id){
        member.team_id = data.team_id;
      }
    });
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
    console.log($event);
    this.adminService.setMember($event).subscribe(data=>{
      if(data.message === 'set_member_success'){
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
  
  onChange(){
    if(!!this.team_id || !!this.level){
      this.temporaryFilteredMembers = this.filteredMembers;
      this.temporaryFilteredMembers = this.temporaryFilteredMembers.filter(member =>{
        if(this.team_id && this.team_id !== member.team_id){
          return false
        }
        if(this.level && this.level !== member.level){
          return false
        }
        return true;
      })
    }else{
      this.filteredMembers = this.members.filter(member =>{
        if(this.team_id && this.team_id !== member.team_id){
          return false
        }
        if(this.level && this.level !== member.level){
          return false
        }
        return true;
      })
      this.temporaryFilteredMembers = this.filteredMembers;
    }
  }
  
  getListInspection(dataSearch) {
    this.adminService.getMemberByName(dataSearch).subscribe(data=>{
      this.filteredMembers = data.data;
      this.filteredMembers = this.filteredMembers.filter(member =>{
        if(this.team_id && this.team_id !== member.team_id){
          return false
        }
        if(this.level && this.level !== member.level){
          console.log(member);
          return false
        }
        return true;
      })
      this.temporaryFilteredMembers = this.filteredMembers;
    })
  }
  updateFilter() {
    this.dataSearch = { name: this.nameF};
    this.getListInspection(this.dataSearch);
  }
  onChangeName(name): void{
    this.nameF = name;
    this.updateFilter();
  }
  onChangeTeamID(team_id): void{
    this.team_id = team_id;
    this.onChange();
  }
  onChangeLevel(level): void{
    this.level = level;
    this.onChange();
  }
}
