import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { SALE } from 'src/app/shared/interfaces/sale.interface';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SaleService {
private detail:any
private detail$:Subject<any[]>
private stock$:Subject<any>
private cancel$:Subject<boolean>
private removed:any
private removed$:Subject<any>
//sendDetailObservable = this.sendDetail.asObservable()
private saleCollection:AngularFirestoreCollection<SALE>
private saleList: Observable<SALE[]>
private tablesToday:AngularFirestoreDocument<any>
  constructor(private fb:AngularFirestore) { 
    this.detail = [];
    this.detail$ = new Subject()
    this.stock$ = new Subject()
    this.cancel$ = new Subject()
    this.removed$ = new Subject()
    this.removed = []
    this.saleCollection = this.fb.collection('sales');
    this.saleList = this.saleCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
  }
  getTodaySales(){
    let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    let salesToday = this.fb.doc(`sales/${date}`);
    return new Promise((resolve,reject)=>{
      salesToday.valueChanges().subscribe(resp=>{
        if(resp){
          resolve(resp)
        }else{
          resolve(null)
        }
      })
    })
  }
  getSales(date){
    //let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    let salesToday = this.fb.doc(`sales/${date}`);
    return new Promise((resolve,reject)=>{
      salesToday.valueChanges().subscribe(resp=>{
        if(resp){
          resolve(resp)
        }else{
          resolve(null)
        }
      })
    })
  }
  getTodayTables(){
    let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    this.tablesToday = this.fb.doc(`tableSales/${date}`);
    return new Promise((resolve,reject)=>{
      this.tablesToday.valueChanges().subscribe(resp=>{
        if(resp){
          resolve(resp)
        }else{
          resolve(null)
        }
      })
    })
  }
  confirmSale(data){
    let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    
    return this.saleCollection.doc(date).set(data, {merge:true})
  }
  confirmTableSale(data){
    let date = formatDate(new Date(), 'YYYY-MM-dd', 'en')
    let salesTodayTables = this.fb.doc(`tableSales/${date}`);
    return salesTodayTables.set(data, {merge:true})
  }
  addDetail(p){
    //console.log(this.detail.find(item => item.id === p.id))
    //console.log(this.detail)
    if (!this.detail.find(item => item.id === p.id && item.name == p.name)) { // search by id
      this.detail.push({
        id: p.id,
        name: p.name,
        presentation:p.presentation,
        cant: 1,
        price:p.price,
        cost: p.price,
        stock:p.stock,
        limited:(p.limited)?true:false
       });
    }else{
      this.detail.find(item => {
        if(item.id === p.id && item.name == p.name){
          item.cant ++
          item.cost = item.price *item.cant
          item.stock =  p.stock
        }
      })
    }
    this.detail$.next(this.detail)
   
  }
  removeItem(p, i){
    console.log(p)
    if(this.detail[i].cant > 1){
      this.detail[i].cant -= 1;
      this.detail[i].cost = this.detail[i].cant *this.detail[i].price
      this.detail[i].stock = (this.detail[i].limited)?this.detail[i].stock+=1:0;
    }else if (this.detail[i].cant == 1){
      this.detail[i].stock = (this.detail[i].limited)?this.detail[i].stock+=1:0;
      //console.log(this.detail.splice(i, 1))
      //this.removed.push(this.detail.splice(i, 1)[0])
      console.log(this.detail[i].stock)
      this.removed$.next(this.detail.splice(i, 1)[0])
      //this.detail.splice(i, 1)
      
    }
    this.detail$.next(this.detail)
    this.stock$.next(p)
  }
  getDetail():Observable<any[]>{
    return this.detail$.asObservable();
  }
  getStock():Observable<any>{
    return this.stock$.asObservable();
  }
  getRemoveds():Observable<any[]>{
    return this.removed$.asObservable();
  }
  newSale(){
    this.detail = []
    this.detail$.next(this.detail)
  }
  loadSale(data){
    console.log(data)
    this.detail = data;
    this.detail$.next(this.detail);
  }
  deleteSale(){
    this.detail = [];
    this.detail$.next(this.detail)
    this.cancel$.next(true)
  }
  cancelSale():Observable<boolean>{
    return this.cancel$.asObservable()
  }
  async getNumberOfSales(){
    let num = 0
    let sales = await this.getTodaySales();
    if(sales){
      num = Object.keys(sales).length
    }
    return num;
  }
}
