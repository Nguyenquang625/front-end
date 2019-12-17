import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inspect-list-leader',
  templateUrl: './inspect-list-leader.component.html',
  styleUrls: ['./inspect-list-leader.component.css']
})
export class InspectListLeaderComponent implements OnInit {
  @Input() listInspections : any =[];
  @Output() sendTitleValue = new EventEmitter<any>();
  @Output() sendLineLocationValue = new EventEmitter<any>();
  @Output() sendLineConditionValue = new EventEmitter<any>();
  
  title: string = '';
  line_location: string = '';
  line_condition: string = '';

  constructor() { }

  ngOnInit() {
    
  }
  filterByTitle(value){
    this.title = value ? value : '';
    this.sendTitleValue.emit(this.title);
  }
  filterByLineLocation(value){
    this.line_location = value ? value : '';
    this.sendLineLocationValue.emit(this.line_location);
  }
  filterLineCondition(value){
    this.line_condition = value ? value : '';
    this.sendLineConditionValue.emit(this.line_condition);
  }
}
