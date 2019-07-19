import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpForm: FormGroup;
  logInForm: FormGroup;
  customError = {signUp: null, logIn: null};

  constructor(fb: FormBuilder, private nodeService: NodeService, private router: Router) { 
    this.signUpForm = fb.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern("^[a-zA-Z0-9]+$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
    this.logInForm = fb.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern("^[a-zA-Z0-9]+$")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.nodeService.signUp(this.signUpForm.value).subscribe(data => {
      if(data.error){
        this.customError.signUp = data.error;
      }else{
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['nodes']);
      }
    });
  }

  logIn() {
    this.nodeService.logIn(this.logInForm.value).subscribe(data => {
      if(data.error){
        this.customError.logIn = data.error;
      }else{
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['nodes']);
      }
    });
  }

}
