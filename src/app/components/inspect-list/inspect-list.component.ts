import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NoAuthService } from 'src/app/services/NoAuthService';

@Component({
  selector: 'app-inspect-list',
  templateUrl: './inspect-list.component.html',
  styleUrls: ['./inspect-list.component.css']
})
export class InspectListComponent implements OnInit {
  @Input() inspections: any;
  @Output() sendValueUpdate = new EventEmitter<any>();
  @Output() sendValueDelete  = new EventEmitter<any>();

  @Output() sendTitleValue = new EventEmitter<any>();
  @Output() sendLineLocationValue = new EventEmitter<any>();
  @Output() sendLineConditionValue = new EventEmitter<any>();
  @Output() sendTeamValue = new EventEmitter<any>();
  @Output() sendStatusValue = new EventEmitter<any>();
  
  
  page: any;
  start_date: any;
  end_date: any;
  statuses : any =[];
  teams : any = [];

  searchTeams = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Đăk Plei'},
    {id: 2, name: 'PleiKu'}
  ];
  searchStatus = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Pending'},
    {id: 2, name: 'OnGoing'},
    {id: 3, name: 'Done'}
  ];

  searchUserId: any;
  title: string = '';
  line_location: string = '';
  line_condition: string = '';
  team_id : number ;
  status : number;

  constructor(
    private noAuthService: NoAuthService
  ) { }

  ngOnInit() {
    // setTimeout(() => {
    //   console.log(this.inspections)
    // }, 100);
    this.getStatus();
    this.getTeams();
  }
  getStatus(){
    this.noAuthService.getStatus().subscribe(data=>{
      if(data.message === 'get_status_sucess'){
        this.statuses = data.data
      }
    })
  }
  getTeams(){
    this.noAuthService.getTeams().subscribe(data=>{
      if(data.message === 'get_teams_sucess'){
        this.teams = data.data
      }
    })
  }
  sendValueInpectUpdate($event){
    return this.sendValueUpdate.emit($event);
  }
  sendValueInpectDelete($event){
    return this.sendValueDelete.emit($event);
  }





  
  filterByTitle(value){
    this.title = value ? value : '';
    this.sendTitleValue.emit(this.title);
  }
  filterByLineLocation(value){
    this.line_location = value ? value : '';
    this.sendLineLocationValue.emit(this.line_location);
  }
  filterByLineCondition(value){
    this.line_condition = value ? value : '';
    this.sendLineConditionValue.emit(this.line_condition);
  }
  filterTeam(value){
    this.team_id = value ? value.id : 0;
    this.sendTeamValue.emit(this.team_id);
  }
  filterByStatus(value){
    this.status = value ? value.id : 0;
    this.sendStatusValue.emit(this.status);
  }
}
