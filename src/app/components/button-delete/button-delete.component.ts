import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent implements OnInit {
  @Input() inspection : any;
  @Output() sendValueDelete = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  handleRefusalToSetEmail(data){

  }
  deleteItem(inspection){
    return this.sendValueDelete.emit(inspection);
  }
}
