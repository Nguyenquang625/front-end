import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoAuthService } from 'src/app/services/NoAuthService';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  teams : any = [];
  name: string;
  team_id : number;
  level : number;
  searchTeams = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Đăk Plei'},
    {id: 2, name: 'PleiKu'}
  ];
  searchLevel = [
    {id: 4, name: 'Banned'},
    {id: 1, name: 'Member'},
    {id: 2, name: 'Owner'},
    {id: 3, name: 'Admin'}
  ];

  @Output() sendValueMember = new EventEmitter<any>();

  @Input() members : any ;
  @Output() sendValueSetAdmin = new EventEmitter<any>();
  @Output() sendValueSetOwner = new EventEmitter<any>();
  @Output() sendValueSetMember = new EventEmitter<any>();
  @Output() sendValueSetBan = new EventEmitter<any>();
  @Output() sendValueSetUnban = new EventEmitter<any>();

  @Output() sendNameValue = new EventEmitter<any>();
  @Output() sendTeamIDValue = new EventEmitter<any>();
  @Output() sendLevelValue = new EventEmitter<any>();

  constructor(
    private noAuthService : NoAuthService
  ) { }

  ngOnInit() {
    this.getTeams();
  }
  getTeams(){
    this.noAuthService.getTeams().subscribe(data=>{
      if(data.message === 'get_teams_sucess'){
        this.teams = data.data;
      }
    })
  }

  newSendValueMemberChange(data){
    this.sendValueMember.emit(data);
  }


  newSendValueSetAdmin($event){
    this.sendValueSetAdmin.emit($event);
  }
  newSendValueSetOwner($event){
    this.sendValueSetOwner.emit($event);
  }
  newSendValueSetMember($event){
    this.sendValueSetMember.emit($event);
  }
  newSendValueBan($event){
    this.sendValueSetBan.emit($event);
  }
  newSendValueUnban($event){
    this.sendValueSetUnban.emit($event);
  }


  filterByName(value){
    this.name = value ? value : '';
    this.sendNameValue.emit(this.name);
  }
  filterTeam(value){
    this.team_id = value ? value.id : 0;
    this.sendTeamIDValue.emit(this.team_id);
  }
  filterByLevel(value){
    this.level = value ? value.id : 0;
    this.sendLevelValue.emit(this.level);
  }
}
