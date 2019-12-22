import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderService } from 'src/app/services/LeaderSevice';

import SocketService from 'src/app/services/socketService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {
  listInspections : any = [];
  notification:any =[];
  isChecked= true;
  lengthNoti : number;

  name : string;
  socket = SocketService.socket;
  token = localStorage.getItem('token');
  chatlogs : any = [];
  chatLogMainUserId : number;
  openChatLog = true;
  @ViewChild('textInput',{static :false}) textInput:ElementRef;

  Admin: any;
  
  dataSearch : any ={ title : '', line_location: '', line_condition: ''}
  title : any ='';
  line_location : any ='';
  line_condition : any ='';

  constructor(
    private router: Router,
    private leaderService: LeaderService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    SocketService.emit('updateSocketId', this.token);
    this.checkLogin();
    this.name = localStorage.getItem('name');
    this.checkAuth();
    this.getInsL();
    this.getNoti();
    this.socketNoti();
    this.getSocketAdmin();
    this.chatControll();
  }
  chatControll(){
    this.socket.on('userReceiveMessage',data=>{
      this.toastr.success('You have a new message!');
      this.leaderService.getChatLog().subscribe(data=>{
        if(data.message==='get_chatlog_success'){
          this.toastr.success('You have a new message!');
          this.chatlogs = data.data;
          this.chatLogMainUserId = data.id;
        }
      });
    });
  }
  getChatLog(){
    this.leaderService.getChatLog().subscribe(data=>{
      if(data.message ==='get_chatlog_success'){
        this.chatlogs = data.data;
        this.chatLogMainUserId = data.id;
      }
    });
  }
  getSocketAdmin(){
    this.leaderService.getAdminSocketID().subscribe(data=>{
      if(data.message==='get_sucess'){
        this.Admin = data.data;
      }
    })
  }
  openAndConnectAdmin(){
    this.openChatLog = !this.openChatLog;
    this.leaderService.getAdminSocketID().subscribe(data=>{
      if(data.message==='get_sucess'){
        this.Admin = data.data;
        let dataConnect= {
          admin : this.Admin,
          token : this.token
        }
        this.getChatLog();
        SocketService.emit('connectToAdmin', dataConnect);
      }
    })
  }
  sendChat(){
    let valueInput = this.textInput.nativeElement.value;
    let body = {
      chatlog : valueInput,
      admin : this.Admin
    }
    this.textInput.nativeElement.value ='';
    this.leaderService.addChat(body).subscribe(data=>{
      if(data.message === 'insert_success'){
        this.getChatLog();
        let newbody = {
          chatlog : this.chatlogs,
          admin : this.Admin
        }
        SocketService.emit('sendMessageToAdmin', newbody);
      }
    })
  }

  socketNoti(){
    this.socket.on('notifyNewWork', result=>{
      this.toastr.success('You have a new notification!');
      this.leaderService.getDataNotify().subscribe(data=>{
        if(data.message === 'get_success'){
          this.toastr.success('You have a new notification');
          this.notification = data.data;
          this.lengthNoti = data.data.length;
        }
      })
    });
  };
  checkLogin(){
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login'])
    }
  }
  checkAuth(){
    if(localStorage.getItem('level') === '3'){
      this.router.navigate(['admin']);
    }
    if(localStorage.getItem('level') === '2'){
      this.router.navigate(['leader']);
    }
    if(localStorage.getItem('level') === '1'){
      this.router.navigate(['member']);
    }
  }
  getInsL(){
    this.leaderService.getOwnerInfo().subscribe(data=>{
      if(data.message === 'get_ins_matched'){
        this.listInspections = data.data;
      }
    })
  }
  moveToMemberChat(){
    this.router.navigate(['member-chat']);
  }
  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login']);
    }
  }
  

  moveToAddUser(){
    this.router.navigate(['admin-add-user']);
  }
  getNoti(){
    this.leaderService.getDataNotify().subscribe(data=>{
      if(data.message === 'get_success'){
        this.notification = data.data;
        this.lengthNoti = data.data.length;
      }
    })
  }
  checkedNotify(){
    this.isChecked = !this.isChecked;
  }

  getListMembers(dataSearch){
    this.leaderService.getInspectionByMultiCondtion(dataSearch).subscribe(data=>{
      if(data.message === 'filter_success'){
        this.listInspections = data.data;
      }
    })
  }
  resetNotify(data){
    this.notification = this.notification.filter(notifi =>{
      if(notifi.id !==data.id){
        return true;
      }
      return false;
    })
    this.lengthNoti = this.notification.length;
  }
  updateFilter() {
    this.dataSearch = { title: this.title, line_location: this.line_location, line_condition: this.line_condition};
    this.getListMembers(this.dataSearch);
  }
  onChangeTitle(title): void{
    this.title = title;
    this.updateFilter();
  }
  onChangeLineLocation(line_location): void{
    this.line_location = line_location;
    this.updateFilter();
  }
  onChangeLineCondition(line_condition): void{
    this.line_condition = line_condition;
    this.updateFilter();
  }
}
