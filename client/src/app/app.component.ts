import { Component, OnInit } from '@angular/core';
import { User } from './interface/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shows-front';
  user: any;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
   console.log(window.localStorage.getItem('username'))
    this.user= window.localStorage.getItem('username')
  }
  logout(){
    window.localStorage.removeItem('username');
  }
}
