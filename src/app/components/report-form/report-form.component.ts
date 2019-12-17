import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LeaderService } from 'src/app/services/LeaderSevice';
import { AdminService } from 'src/app/services/AdminService';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  worksDetails : any = [];
  overallPercent : number = 0;

  @Input() inspection : any;
  @Input() typeModal : any;
  @Output() SendValueInsStatus= new EventEmitter<any>();
  @Output() sendValueInsStatusClose = new EventEmitter<any>();
  modalRef : BsModalRef;
  constructor(
    private modalService : BsModalService,
    private leaderService : LeaderService,
    private adminService : AdminService
    ) { }

  ngOnInit() {
    this.getWorkDetails();
  }

  openModal(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template,{class : 'modal-lg'});
    this.overallPercent = 0;
    this.worksDetails.filter(work =>{
      this.overallPercent += work.progress;
      return true
    })
    this.overallPercent /= this.worksDetails.length;
  }
  
  getWorkDetails(){
    if(!!this.inspection.id){
      const body = {
        inspection_id : this.inspection.id
      };
      this.leaderService.getWorkDetailsByInspectionId(body).subscribe(data=>{
        if(data.message === 'get_work_details_success'){
          this.worksDetails = data.data;
        }
      })
    }
  }
  newSendValueInsStatus(data){
    this.SendValueInsStatus.emit(data);
  }
  newSendValueInsStatusClose(data){
    this.sendValueInsStatusClose.emit(data);
  }
}
