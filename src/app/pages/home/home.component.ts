import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info : any ;
  formInsert : FormGroup;
  constructor(
    private fb : FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getInfo();
    this.init();
  }
  init(){
    this.formInsert = this.fb.group({
      username : [null,Validators.required],
      password : [null,Validators.required]
    })
  }
  onInsertSubmit(){
    const body = this.formInsert.value;
    this.userService.insertUser(body).subscribe(data=>{
      if(data.message == "insert_success"){
        // this.getInfo();
        
        this.info.add(data.data);
      }
    })
  }
  getInfo(){
    this.userService.getInfo().subscribe(data=>{
      if(data.message =="error" ){

      }else{
        this.info = data.data
      }
    })
  }
}
