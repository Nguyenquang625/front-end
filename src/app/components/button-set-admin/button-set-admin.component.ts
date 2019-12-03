import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-set-admin',
  templateUrl: './button-set-admin.component.html',
  styleUrls: ['./button-set-admin.component.css']
})
export class ButtonSetAdminComponent implements OnInit {
  @Input() member : any;
  @Output() sendValueSetAdmin = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleRefusalToSetEmail(data){

  }
  setAdmin(member){
    this.sendValueSetAdmin.emit(member);
  }
}
