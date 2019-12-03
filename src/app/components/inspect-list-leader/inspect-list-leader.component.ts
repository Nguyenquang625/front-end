import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inspect-list-leader',
  templateUrl: './inspect-list-leader.component.html',
  styleUrls: ['./inspect-list-leader.component.css']
})
export class InspectListLeaderComponent implements OnInit {
  @Input() listInspections : any =[];
  constructor() { }

  ngOnInit() {
    
  }

}
