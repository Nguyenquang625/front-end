import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-work-list-member',
  templateUrl: './work-list-member.component.html',
  styleUrls: ['./work-list-member.component.css']
})
export class WorkListMemberComponent implements OnInit {
  @Input() workDetails : any = [];
  @Input() inspections : any =[];
  @Output() sendValueWorkDetail = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  newSendValueWorkDetail(data){
    this.sendValueWorkDetail.emit(data);
  }
}
