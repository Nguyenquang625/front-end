import { Component, OnInit, TemplateRef, Input,Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap'
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/AdminService';

import {HttpClient} from '@angular/common/http'
import { NoAuthService } from 'src/app/services/NoAuthService';

@Component({
  selector: 'app-inspect-edit',
  templateUrl: './inspect-edit.component.html',
  styleUrls: ['./inspect-edit.component.css']
})
export class InspectEditComponent implements OnInit {
  inspectionForm: FormGroup;
  teams : any = [];
  owners : any = [];
  @Input() typeModal: string;
  @Input() inspection: any = [];
  @Output() sendValue = new EventEmitter<any>();
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private adminService : AdminService,
    private http : HttpClient,
    private noAuthService : NoAuthService
  ) { }

  ngOnInit() {
    this.init();
    this.getTeams();
    this.getOwners();
  }
  init() {
    this.inspectionForm = this.fb.group({
      title: [''],
      line_location: [''],
      line_condition: [''],
      description: [''],
      equipment_require: [''],
      team_id: [],
      start_date: [''],
      end_date: [''],
      owner_id: []
    })
  }
  getTeams(){
    this.noAuthService.getTeams().subscribe(data=>{
      this.teams = data.data;
    })
  }
  getOwners(){
    this.noAuthService.getOwners().subscribe(data=>{
      this.owners =data.data;
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    if (this.typeModal === 'update') {
      const { title, line_location, line_condition,
        description, equipment_require, team_id, start_date, end_date,owner_id } = this.inspection;
      this.inspectionForm.patchValue({
        title: title,
        line_location: line_location,
        line_condition: line_condition,
        description: description,
        equipment_require: equipment_require,
        team_id: team_id,
        start_date: new Date(start_date).toISOString().substring(0, 10),
        end_date: new Date(end_date).toISOString().substring(0, 10),
        owner_id : owner_id
      });
    }
  }
  submitEdit() {
    const { title, line_location, line_condition,
      description, equipment_require, team_id, start_date, end_date, owner_id } = this.inspectionForm.value;
    const body = {
      id: this.inspection.id,
      title, line_location, line_condition,
      description, equipment_require, team_id, start_date, end_date, owner_id
    };
    if (this.typeModal === 'update') {
      this.modalRef.hide();
      return this.sendValue.emit(body);
    }

  }
}
