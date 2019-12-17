import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb : FormBuilder,
    private router: Router,
    private authService : AuthService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.check();
    this.init();
  }
  check(){
    if(!!localStorage.getItem('name')&&!!localStorage.getItem('token')&&localStorage.getItem('level')){
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
  }
  init(){
    this.loginForm = this.fb.group({
      username : [null,Validators.required],
      password : [null,Validators.required]
    })
  }
  submitLogin(){
    const body = this.loginForm.value;
    this.authService.login(body).subscribe(data=>{
      if(data.message === 'login_success'){
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.data.name)
        localStorage.setItem('level', data.data.level)
        if(data.message =="login_success"){
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
      }else{
        this.toastr.error(data.message);
      }
    })
  }
}
