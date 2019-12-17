import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderService } from 'src/app/services/LeaderSevice';
import SocketService from '../../services/socketService';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {
  listInspections : any = [];
  notification:any =[];
  isChecked= true;

  
  dataSearch : any ={ title : '', line_location: '', line_condition: ''}
  title : any ='';
  line_location : any ='';
  line_condition : any ='';

  constructor(
    private router: Router,
    private leaderService: LeaderService
  ) { }

  ngOnInit() {
    this.checkAuth();
    this.getInsL();
    this.getNoti();
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
        this.listInspections = data.data;
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
  
  moveToAddUser(){
    this.router.navigate(['admin-add-user']);
  }
  getNoti(){
    this.leaderService.getDataNotify().subscribe(data=>{
      if(data.message === 'get_success'){
        this.notification = data.data;
      }
    })
  }
  checkedNotify(){
    this.isChecked = !this.isChecked;
  }

  getListMembers(dataSearch){
    this.leaderService.getInspectionByMultiCondtion(dataSearch).subscribe(data=>{
      if(data.message === 'filter_success'){
        this.listInspections = data.data;
        console.log(this.listInspections);
      }
    })
  }
  
  updateFilter() {
    this.dataSearch = { title: this.title, line_location: this.line_location, line_condition: this.line_condition};
    this.getListMembers(this.dataSearch);
  }
  onChangeTitle(title): void{
    this.title = title;
    this.updateFilter();
  }
  onChangeLineLocation(line_location): void{
    this.line_location = line_location;
    this.updateFilter();
  }
  onChangeLineCondition(line_condition): void{
    this.line_condition = line_condition;
    this.updateFilter();
  }
}
