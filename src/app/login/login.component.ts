import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user:string;
password:string;
  constructor(private as:AuthService,
    private router:Router,
    private alertS:AlertService) { }

  ngOnInit(): void {
    //this.login();
  }
  login(){
    this.as.validateAccount(this.password).then((user:any)=>{
      if(user && user.username == this.user){
        this.router.navigate(['admin/']) 
      }else{
        this.alertS.mensajeAdvertencia2('ERROR!!!', 'Datos incorrectos')
      }
     
    })
  }
}
