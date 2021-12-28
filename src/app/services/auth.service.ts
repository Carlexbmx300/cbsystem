import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs:AngularFirestore) { }

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
}
