import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import {AdminService} from '../../services/AdminService'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { inspect } from 'util';
import SocketService from 'src/app/services/socketService';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name : String;
  login: any = true;
  inspections : any = [];
  filteredInspections : any = [];
  
  temporaryFilteredInspections : any = [];

  handleChat = true;
  socket = SocketService.socket;
  token = localStorage.getItem('token');
  currtentUserChat : string;
  currentNameUserChat : string;
  socket_id: string;
  chatlogs : any = [];
  chatLogMainUserId : number;
  openChatLog = true;
  @ViewChild('textInputAdmin',{static :false}) textInputAdmin:ElementRef;
  
  dataSearch : any ={ title : '', line_location: '', line_condition: ''}
  title : any ='';
  line_location : any ='';
  line_condition : any ='';
  team_id: number;
  status: number;

  constructor(
    private router : Router,
    private adminService: AdminService,
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit() {
    SocketService.emit('updateSocketId', this.token);
    this.checkLogin();
    this.checkAuth();
    this.name = localStorage.getItem('name');
    this.getInspection();
    this.handleChatAdmin();
  }

  
  handleChatAdmin(){
    this.socket.on('notifyConnect', data=>{
      this.currtentUserChat= data.user;
      this.socket_id= data.socket_id;
      this.toastr.success('You have a new message!');
      let getInfo = {
        user : this.currtentUserChat
      }
      this.openChatLog = !this.openChatLog;
      this.adminService.getChatLog(getInfo).subscribe(data=>{
        if(data.message==='get_chatlog_success'){
          this.toastr.success('You have a new message!');
          this.currentNameUserChat = data.name
          this.chatlogs = data.data;
          this.chatLogMainUserId = data.id;
        }
      });
    })
    this.socket.on('adminReceiveMessage', data=>{
      this.toastr.success('You have a new message!');
      let getInfo = {
        user : this.currtentUserChat
      }
      this.adminService.getChatLog(getInfo).subscribe(data=>{
        if(data.message==='get_chatlog_success'){
          this.toastr.success('You have a new message!');
          this.chatlogs = data.data;
          this.chatLogMainUserId = data.id;
        }
      });
    })
  }
  
  getChatLog(){
    let getInfo = {
      user : this.currtentUserChat
    }
    this.adminService.getChatLog(getInfo).subscribe(data=>{
      if(data.message==='get_chatlog_success'){
        this.chatlogs = data.data;
        this.chatLogMainUserId = data.id;
      }
    })
  }
  sendChatAdmin(){
    let valueInput = this.textInputAdmin.nativeElement.value;
    let body = {
      user : this.currtentUserChat,
      chatlog: valueInput
    }
    this.textInputAdmin.nativeElement.value = '';
    this.adminService.addchat(body).subscribe(data => {
      if(data.message==='insert_success'){
        SocketService.emit('sendMessageToUser', this.socket_id);
        this.getChatLog();
      }
    })
  }

  updateInspect($event) {
    this.adminService.updateInspec($event).subscribe(data => {
      //console.log(data);
      if (data.message === 'update_success') {
        this.inspections = this.inspections.map(inspect => {
          if (inspect.id === data.data[0].id) {
            inspect = data.data[0];
          }
          return inspect;
        })
        this.filteredInspections = this.inspections;
        this.temporaryFilteredInspections = this.filteredInspections;
      }
    })
  }
  deleteInspect($event){
    this.adminService.deleteInspec($event).subscribe(data=>{
      this.inspections = this.inspections.filter( inspection => inspection.id != $event.id);
      this.filteredInspections = this.inspections;
      this.temporaryFilteredInspections = this.filteredInspections;
    })
  }
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
  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    if(!localStorage.getItem('name')||!localStorage.getItem('token')||!localStorage.getItem('level')){
      this.router.navigate(['login']);
    }
  }
  // setHeaders():HttpHeaders{
  //   let headers = new HttpHeaders();

  //   headers.append('Content-Type', 'application/json');
  //   const token = localStorage.getItem('token');
  //   if(token){
  //    headers = headers.append('Authorization', token);
  //   }
  //   return headers;
  // }
  getInspection(){
  //  let headers = this.setHeaders();
    this.adminService.getInspectation().subscribe(data=>{
      if(data.message ==='get_inspectation_success'){
        this.inspections = data.data;
        this.filteredInspections =data.data;
        this.temporaryFilteredInspections = data.data;
      }
    })
  }



  onChange(){
    if(!!this.team_id || !!this.status){
      this.temporaryFilteredInspections = this.filteredInspections;
      this.temporaryFilteredInspections = this.temporaryFilteredInspections.filter(inspection =>{
        if(this.team_id && this.team_id !== inspection.team_id){
          return false
        }
        if(this.status && this.status !== inspection.status){
          return false
        }
        return true;
      })
    }else{
      this.filteredInspections = this.inspections.filter(inspection =>{
        if(this.team_id && this.team_id !== inspection.team_id){
          return false
        }
        if(this.status && this.status !== inspection.status){
          return false
        }
        return true;
      })
      this.temporaryFilteredInspections = this.filteredInspections;
    }
  }

  getListInspection(dataSearch) {
    this.adminService.getInspectionByTitle(dataSearch).subscribe(data=>{
      this.filteredInspections = data.data;
      this.filteredInspections = this.filteredInspections.filter(inspection =>{
        if(this.team_id && this.team_id !== inspection.team_id){
          return false
        }
        if(this.status && this.status !== inspection.status){
          return false
        }
        return true;
      })
      this.temporaryFilteredInspections = this.filteredInspections;
    })
  }
  updateFilter() {
    this.dataSearch = { title: this.title, line_location: this.line_location, line_condition: this.line_condition};
    this.getListInspection(this.dataSearch);
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
  onChangeTeam(team_id): void{
    this.team_id = team_id;
    this.onChange();
  }
  onChangeStatus(status): void{
    this.status = status;
    this.onChange();
  }


  newSendValueInsStatus(data){
    this.inspections = this.inspections.map(inspect => {
      if (inspect.id === data.id) {
        inspect = data;
      }
      return inspect;
    })
    this.filteredInspections = this.inspections;
    this.temporaryFilteredInspections = this.filteredInspections;
  }
  newSendValueInsStatusClose(data){
    this.inspections = this.inspections.map(inspect => {
      if (inspect.id === data.id) {
        inspect = data;
      }
      return inspect;
    })
    this.filteredInspections = this.inspections;
    this.temporaryFilteredInspections = this.filteredInspections;
  }
}
