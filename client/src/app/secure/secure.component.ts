import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  shows!:any
  form!: FormGroup;
  err:string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private showService:ShowsService
    
  ) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      query:new FormControl('',),
     
    });
  }
  get f() { return this.form.controls; }
  submit(){
    this.showService.getShows(this.form.getRawValue()).subscribe(res=>this.shows=res)
  }
}
