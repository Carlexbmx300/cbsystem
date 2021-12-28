import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';
import { CONFIG, CATEGORIES } from "../interfaces/config.interface";
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
private configCollection:AngularFirestoreCollection<CATEGORIES>;
private configList:Observable<CATEGORIES[]>;
  constructor(private fb:AngularFirestore) { 
    this.configCollection = this.fb.collection('config');
    this.configList = this.configCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      }
    ))
  }
  getConfig(type){
    return this.configCollection.doc(type).valueChanges();
  }
  config(type:string){
    return new Promise((resolve, reject) => {
      let types = this.fb.collection('config').doc(type);
      types.get().subscribe(tp=>{
        if(tp){
          resolve(tp.data())
        }else{
          resolve(null)
        }
      })
    })
  }
}
