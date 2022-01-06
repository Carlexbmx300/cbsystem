import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(private fb:AngularFirestore) { }

  getTodayCash(){
    let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    let cashToday = this.fb.doc(`cash/${date}`);
    return new Promise((resolve,reject)=>{
      cashToday.valueChanges().subscribe(resp=>{
       
        if(resp){
          resolve(resp)
        }else{
          resolve({status:'OPEN'})
        }
      })
    })
  }
  getCash(date){
    let cashToday = this.fb.doc(`cash/${date}`);
    return new Promise((resolve,reject)=>{
      cashToday.valueChanges().subscribe(resp=>{
        if(resp){
          resolve(resp)
        }else{
          resolve(null)
        }
      })
    })
  }
  addCash(data){
    //let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    let cashRef = this.fb.doc(`cash/${data.date}`);
    localStorage.setItem('cash', JSON.stringify(data))
    return cashRef.set(data,{merge:true})
  }
  isCashOpen(){
    const cash = JSON.parse(localStorage.getItem('cash'))
    return (cash !== null) ? true : false;
  }
  getLocalCash(){
    return JSON.parse(localStorage.getItem('cash'));
  }
}
