import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaderService } from 'src/app/services/LeaderSevice';

@Component({
  selector: 'app-notify-link',
  templateUrl: './notify-link.component.html',
  styleUrls: ['./notify-link.component.css']
})
export class NotifyLinkComponent implements OnInit {
  @Input() notify:any;
  @Output() sendNotifyValue = new EventEmitter<any>();
  inspection : any;
  constructor(
    private leaderService : LeaderService
  ) { }

  ngOnInit() {
    this.getInspection();
  }
  getInspection(){
    const searchId ={
      id : this.jsonStrin(this.notify.data).inspection_id
    }
    this.leaderService.getInspectionById(searchId).subscribe(data=>{
      if(data.message ==='get_success'){
        this.inspection = data.data;
      }
    })
  }
  jsonStrin(data) {
    return JSON.parse(data);
  }
  setChecked(){
    const body = {
      id : this.notify.id
    }
    this.leaderService.checkedNoti(body).subscribe(data=>{
      if(data.message ==='get_success'){
        this.sendNotifyValue.emit(data.data);
      }
    })
  }
}
