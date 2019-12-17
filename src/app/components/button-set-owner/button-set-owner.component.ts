import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button-set-owner',
  templateUrl: './button-set-owner.component.html',
  styleUrls: ['./button-set-owner.component.css']
})
export class ButtonSetOwnerComponent implements OnInit {
  @Input() member : any; 
  @Output() sendValueSetOwner = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleRefusalToSetEmail($event){

  }
  setOwner(member){
    this.sendValueSetOwner.emit(member);
  }
}
