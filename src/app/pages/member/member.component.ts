import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/MemberService';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  workDetails : any = [];
  inspections : any = [];
  constructor(
    private router : Router,
    private memberService : MemberService
  ) { }

  ngOnInit() {
    this.checkAuth();
    this.getWorkdetails();
    this.getInspections();
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
  getWorkdetails(){
    this.memberService.getWorkDetails().subscribe(data=>{
      this.workDetails = data.data;
    })
  }
  getInspections(){
    this.memberService.getInspections().subscribe(data=>{
      if(data.message === 'get_ins_success'){
        this.inspections = data.data;
      }
    })
  }
  resetData(data){
    this.workDetails.map( workDetail => {
      if(workDetail.id == data.id){
        workDetail.description = data.description;
      }
    });
    const dataJson = JSON.stringify(data);
    const body ={
      data : dataJson,
    }
    this.memberService.addWorkNotify(body).subscribe(data2=>{
      if(data2.message==='notification_added'){
        console.log(data2);
      }
    })
  }
}
