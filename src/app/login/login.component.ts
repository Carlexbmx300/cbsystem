import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private as:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    //this.login();
  }
  login(){
    this.as.validateAccount('admin123').then(user=>{
      //console.log(user);
      this.router.navigate(['admin/'])
    })
  }
}
