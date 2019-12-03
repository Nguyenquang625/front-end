import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LeaderService } from 'src/app/services/LeaderSevice';


@Component({
  selector: 'app-view-work-list',
  templateUrl: './view-work-list.component.html',
  styleUrls: ['./view-work-list.component.css']
})
export class ViewWorkListComponent implements OnInit {
  worksDetails : any = [];
  members : any = []; 

  @Input() listInspection : any;
  @Input() typeModal : any;

  modalRef : BsModalRef;
  constructor(
    private modalService : BsModalService,
    private leaderService : LeaderService,
  ) { }

  ngOnInit() {
    this.getWorkDetails();
    this.getTeamMembers();
  }
  openModal(template : TemplateRef<any>){
    this.getWorkDetails();
    this.modalRef = this.modalService.show(template,{class : 'modal-lg'});
  }
  getWorkDetails(){
    if(!!this.listInspection.id){
      const body = {
        inspection_id : this.listInspection.id
      };
      this.leaderService.getWorkDetailsByInspectionId(body).subscribe(data=>{
        if(data.message === 'get_work_details_success'){
          this.worksDetails = data.data;
        }
      })
    }
  }
  getTeamMembers(){
    this.leaderService.getMembers().subscribe(data=>{
      if(data.message === 'get_members_sucess'){
        this.members = data.data;
      }
    })
  }
}
