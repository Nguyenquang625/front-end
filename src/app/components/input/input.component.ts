import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() title: any;
  @Input() data: any = [];
  @Output() sendTitleSearch = new EventEmitter<any>();
  @Input() defaultSearch: any;

  
  item: any;
  name: string = '';
  constructor() { }

  ngOnInit() {
    if (this.defaultSearch) {
      this.item = this.defaultSearch.id;
    }
  }
  
  ngOnChanges() {}

  search(name) {
    this.sendTitleSearch.emit(name);
  }

  onChange(data) {
    this.sendTitleSearch.emit(data);
  }
}
