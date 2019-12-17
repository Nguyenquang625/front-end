import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-set-member',
  templateUrl: './button-set-member.component.html',
  styleUrls: ['./button-set-member.component.css']
})
export class ButtonSetMemberComponent implements OnInit {
  @Input() member : any;
  @Output() sendValueSetMember = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  setMember(member){
    this.sendValueSetMember.emit(member);
  }
}
