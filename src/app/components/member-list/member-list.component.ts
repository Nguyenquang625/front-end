import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoAuthService } from 'src/app/services/NoAuthService';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  teams : any = []

  @Input() members : any = [];
  @Output() sendValueSetAdmin = new EventEmitter<any>();
  @Output() sendValueSetOwner = new EventEmitter<any>();
  @Output() sendValueSetMember = new EventEmitter<any>();
  @Output() sendValueSetBan = new EventEmitter<any>();
  @Output() sendValueSetUnban = new EventEmitter<any>();

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
}
