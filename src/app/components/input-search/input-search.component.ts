import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Input()
    get value() {
        return this.inputValue;
  }
  
  @Input() placeholder: string = '';
  @Input() disabled: boolean;
  @Output() valueChange = new EventEmitter();
  @Input() type: string;
  @Input() title: string;
  @Input() error: string;
  @Input() form_control_name: string;
  @Input() group: FormGroup;
  @Input() tab_index;

  private inputValue: string = '';

  constructor() { }

  ngOnInit() {
  }
  
  set value(val) {
      this.inputValue = val;
      this.valueChange.emit(this.inputValue);
  }
}
