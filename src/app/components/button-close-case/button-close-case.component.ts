import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/AdminService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-close-case',
  templateUrl: './button-close-case.component.html',
  styleUrls: ['./button-close-case.component.css']
})
export class ButtonCloseCaseComponent implements OnInit {

  @Input() inspection: any;
  @Output() sendValueInsStatus  = new EventEmitter<any>();
  @Output() sendValueInsStatusClose  = new EventEmitter<any>();

  constructor(
    private adminService: AdminService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
  }
  handleRefusalToSetEmail($event){

  }
  closeInspection(inspection){
    if(inspection.status === 3){
      this.toastr.error('This case already closed!');
    }else{
      this.adminService.closeInspection(inspection).subscribe(data=>{
        if(data.message === 'case_has_been_closed'){
          this.toastr.success(data.message);
          this.inspection = data.data;
          this.sendValueInsStatusClose.emit(this.inspection);
        }else{
          this.toastr.error(data.message);
        }
      })
    }
  }
  reOpenInspection(inspection){
    if(inspection.status === 2 || inspection.status === 1){
      this.toastr.error('This case is still being opened!');
    }else{
      this.adminService.reOpenInspection(inspection).subscribe(data=>{
        if(data.message === 'case_reopended'){
          this.toastr.success(data.message);
          this.inspection = data.data;
          this.sendValueInsStatus.emit(this.inspection);
        }else{
          this.toastr.error(data.message);
        }
      })
    }
  }
}
