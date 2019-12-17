import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NoAuthService } from 'src/app/services/NoAuthService';
import { AdminService } from 'src/app/services/AdminService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  modalRef : BsModalRef;
  memberInfoForm : FormGroup;
  teams: any;

  @Input() member: any;
  @Input() typeModal: string;
  @Output() sendValueMemberChange = new EventEmitter<any>();
  
  constructor(
    private fb : FormBuilder,
    private modalService: BsModalService,
    private noAuthService : NoAuthService,
    private adminService : AdminService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.init();
    this.getTeams();
  }

  init(){
    this.memberInfoForm = this.fb.group({
      name : ['', Validators.required],
      username : ['', Validators.required],
      adress : ['', Validators.required],
      mail : ['', Validators.required],
      team_id : [null, Validators.required],
    })
  }
  getTeams(){
    this.noAuthService.getTeams().subscribe(data=>{
      this.teams = data.data;
    })
  }
  openModal(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    if(this.typeModal==='editProfile'){
      this.memberInfoForm.patchValue({
        name : this.member.name,
        username : this.member.username,
        adress : this.member.adress,
        mail : this.member.mail,
        team_id : this.member.team_id,
      });
    }
  }
  submitEdit(){
    if(this.typeModal ==='editProfile'){
      const body = {
        id : this.member.id,
        name : this.memberInfoForm.value.name,
        username : this.memberInfoForm.value.username,
        adress : this.memberInfoForm.value.adress,
        mail : this.memberInfoForm.value.mail,
        team_id : this.memberInfoForm.value.team_id,
      }
      this.adminService.updateUserProfileByAdmin(body).subscribe(data=>{
        if(data.message === 'update_success'){
          this.member=data.data;
          this.toastr.success(data.message);
          this.sendValueMemberChange.emit(this.member);
          this.modalRef.hide();
        }
        else{
          this.toastr.error(data.message);
        }
      })
    }
  }
}
