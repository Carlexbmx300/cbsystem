import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PRODUCT } from "../../shared/interfaces/product.interface";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection:AngularFirestoreCollection<PRODUCT>;
  private productList:Observable<PRODUCT[]>
  constructor(private fb:AngularFirestore) { 
    this.productCollection = this.fb.collection('products');
    this.productList = this.productCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      }
    ))
  }
  getProducts(){
    return this.productList;
  }
  addProduct(data){
    return this.productCollection.add(data);
  }
  updateProduct(doc, data){
    return this.productCollection.doc(doc).set(data, {merge:true});
  }
  deleteProduct(id){
    return this.productCollection.doc(id).delete();
  }
  getProduct(doc:string){
    return new Promise((resolve, reject) => {
      let prod = this.productCollection.doc(doc)
      prod.get().subscribe(p=>{
        if(p){
          resolve(p.data())
        }else{
          resolve(null)
        }
      })
    })
  }
}
