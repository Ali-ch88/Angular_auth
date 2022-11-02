import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  err:string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar
    
  ) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }
  get f() { return this.form.controls; }

  submit():void {
  
    if(this.form.valid){
      const value= {role:'admin',...this.form.getRawValue()}
      this.authService.login(value)
        .subscribe((res)=>{
          window.localStorage.setItem('username', res.username)
          this.router.navigate(['/'])
        })
    }
    
  }
  

}