import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TABLE } from "../../shared/interfaces/sale.interface";
@Injectable({
  providedIn: 'root' 
})
export class TablesService {
private tableCollection:AngularFirestoreCollection<TABLE>
private tableList:Observable<TABLE[]>
  constructor(private fb:AngularFirestore) { 
    this.tableCollection = this.fb.collection('tables');
    this.tableList = this.tableCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {id, ...data}
        })
      }
    ))
  }
  getTables(){
    return this.tableList
  }
  updateTable(id, data){
    return this.tableCollection.doc(id).set(data, {merge:true});
  }
  getTable(id){
    return this.tableCollection.doc(id).valueChanges();
  }
}
