import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from '../shared/services/alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs:AngularFirestore,
    private as:AlertService,
    private router:Router) { }

  validateAccount(doc:string){
    return new Promise((resolve, reject) => {
      let user = this.afs.collection('users').doc(doc);
      user.get().subscribe(us=>{
        if(us){
          resolve(us.data())
        }else{
          resolve(null)
        }
      })
    })
  }
  logOut(){
    this.as.confirmLogout().then(res=>{
      if(res.isConfirmed){
        this.router.navigate(['']) 
      }
    })
  }
}
