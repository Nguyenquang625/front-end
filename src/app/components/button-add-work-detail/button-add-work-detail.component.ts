import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LeaderService } from 'src/app/services/LeaderSevice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-add-work-detail',
  templateUrl: './button-add-work-detail.component.html',
  styleUrls: ['./button-add-work-detail.component.css']
})
export class ButtonAddWorkDetailComponent implements OnInit {
  workDetailForm : FormGroup;
  workDetail : any;
  workDetails : any = [];
  members :any = [];

  @Input() typeModal: string;
  @Input() inspection_id : any;
  @Input() inspection : any;

  modalRef : BsModalRef;
  constructor(
    private fb : FormBuilder,
    private modalService : BsModalService,
    private leaderService : LeaderService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.init();
    this.getMembers();
  }

  init(){
    this.workDetailForm = this.fb.group({
       title : [null,Validators.required],
       user_id : []
    })
  }
  getMembers(){
    this.leaderService.getMembers().subscribe(data=>{
      if(data.message ==='get_members_sucess'){
        this.members = data.data;
      }
    })
  }
  openModal(template : TemplateRef<any>){
    console.log(this.inspection)
    if(this.inspection.status === 3){
      this.toastr.error('Project has been shut down by admin, you can no longer add work');
    }else{
      this.modalRef = this.modalService.show(template);
    }
  }
  submitInsert(){
    if(this.typeModal ==='insert'){
      if(!this.workDetailForm.value.title|| !this.workDetailForm.value.user_id){
        this.toastr.error('PLEASE FILL ALL INFORMATION!', 'Error');
      }else{
        const body = {
          title : this.workDetailForm.value.title,
          user_id : this.workDetailForm.value.user_id,
          inspection_id : this.inspection_id
        }
        this.leaderService.addWorkDetail(body).subscribe(data=>{
          if(!data.data){
            this.toastr.error(data.message, 'Error');
          }else{
            this.toastr.success(data.message)
            this.modalRef.hide();
          }
        })
      }
      
    }
  }
}
