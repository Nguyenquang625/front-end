import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from 'src/app/services/MemberService';
import SocketService from 'src/app/services/socketService';

@Component({
  selector: 'app-add-desciption-member',
  templateUrl: './add-desciption-member.component.html',
  styleUrls: ['./add-desciption-member.component.css']
})
export class AddDesciptionMemberComponent implements OnInit {
  workDetailForm : FormGroup;

  @Input() typeModal: string;
  @Input() workDetail: any;
  @Output() sendValueWorkDetail = new EventEmitter<any>();
  @Output() sendNotifyInfo = new EventEmitter<any>();


  modalRef : BsModalRef;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private memberService: MemberService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.init();
  }
  init(){
    this.workDetailForm = this.fb.group({
      description : [''],
    })
  }
  openModal(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    if(this.typeModal==='editWork'){
      this.workDetailForm.patchValue({
        description: this.workDetail.description
      });
    }
  }
  submitEdit(){
    const body ={
      id: this.workDetail.id,
      description :this.workDetailForm.value.description,
      workDetail : this.workDetail,
      token : localStorage.getItem('token')
    }
    SocketService.emit('workNotify', body);
    this.memberService.editWorkDetail(body).subscribe(data=>{
      if(data.message === 'success'){
        this.workDetail = data.data[0];
        this.toastr.success(data.message);
        this.modalRef.hide();
        return this.sendValueWorkDetail.emit(this.workDetail);
      }
      else{
        this.toastr.error(data.message);
      }
    })
  }
}
