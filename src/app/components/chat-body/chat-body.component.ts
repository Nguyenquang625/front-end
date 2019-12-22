import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {
  @Input() chatLogs : any = [];
  @Input() chatLogMainUserId : number;
  constructor() { }

  ngOnInit() {
  }
}
