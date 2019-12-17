import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-set-unban',
  templateUrl: './button-set-unban.component.html',
  styleUrls: ['./button-set-unban.component.css']
})
export class ButtonSetUnbanComponent implements OnInit {
  @Input() member : any;
  @Output() sendValueUnban = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleRefusalToSetEmail(data){
    
  }
  setUnban(member){
    this.sendValueUnban.emit(member);
  }
}
