import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-set-ban',
  templateUrl: './button-set-ban.component.html',
  styleUrls: ['./button-set-ban.component.css']
})
export class ButtonSetBanComponent implements OnInit {
  @Input() member : any;
  @Output() sendValueBan = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleRefusalToSetEmail(data){

  }
  setBan(member){
    this.sendValueBan.emit(member);
  }
}
