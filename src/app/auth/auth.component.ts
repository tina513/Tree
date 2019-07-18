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
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.logInForm = fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.nodeService.signUp(this.signUpForm.value).subscribe(data => {
      if(data.error){
        this.customError.signUp = data.error;
      }else{
        this.router.navigate(['nodes']);
      }
    });
  }

  logIn() {
    this.nodeService.logIn(this.logInForm.value).subscribe(data => {
      if(data.error){
        this.customError.logIn = data.error;
      }else{
        this.router.navigate(['nodes']);
      }
    });
  }

}
