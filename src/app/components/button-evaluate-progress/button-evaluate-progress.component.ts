import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LeaderService } from 'src/app/services/LeaderSevice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-evaluate-progress',
  templateUrl: './button-evaluate-progress.component.html',
  styleUrls: ['./button-evaluate-progress.component.css']
})
export class ButtonEvaluateProgressComponent implements OnInit {
  formProgress: FormGroup;
  numbers: any;
  @Input() typeModal: string;
  @Input() worksDetail: any;
  @Output() sendValueAdjustProgress = new EventEmitter<any>();

  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private leaderService: LeaderService,
    private toastr: ToastrService
  ) {

    this.numbers = Array(101).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.formProgress = this.fb.group({
      progress: [null, Validators.required]
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    if (this.typeModal === 'evaluate') {
    }
  }
  submitAdjust() {
    if (this.typeModal === 'evaluate') {
      const body = {
        id: this.worksDetail.id,
        progress: this.formProgress.value.progress
      }
      this.leaderService.updateProgress(body).subscribe(data => {
        if (data.message === 'save_success') {
          this.worksDetail = data.data;
          this.sendValueAdjustProgress.emit(this.worksDetail);
          this.modalRef.hide();
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
    else {
      this.toastr.error('Please select a number!');
    }
  }
}
