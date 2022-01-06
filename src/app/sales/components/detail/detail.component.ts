import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LiteralService } from 'src/app/shared/services/literal.service';
import { SaleService } from '../../services/sale.service';
import { formatDate } from '@angular/common';
import { ConfirmSaleModalComponent } from "../confirm-sale-modal/confirm-sale-modal.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NoteModalComponent } from "../note-modal/note-modal.component";
import { OrderTableModalComponent } from "../order-table-modal/order-table-modal.component";
import { CashModalComponent } from "../cash-modal/cash-modal.component";
import { TablesService } from '../../services/tables.service';
import { TABLE } from 'src/app/shared/interfaces/sale.interface';
import { ProductService } from '../../services/product.service';
import { CashService } from '../../services/cash.service';
import { CASH } from '../../interfaces/cash.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
details = []
total:number = 0;
detailSubscribe;
client:string = '';
doc:string = '0';
modalRef: MdbModalRef<ConfirmSaleModalComponent>;
modalNoteRef: MdbModalRef<NoteModalComponent>;
modalTableRef:MdbModalRef<OrderTableModalComponent>
modalCashRef:MdbModalRef<CashModalComponent>
tables:TABLE[];
table:any = '';
pendingSale:boolean=false;
pendingDetail:any = []
removedSubscribe;
products = [];
cash:CASH;
  constructor(private saleS:SaleService,
    private as:AlertService,
    private literal:LiteralService,
    private modalService: MdbModalService,
    private ts:TablesService,
    private ps:ProductService,
    private cashS:CashService,
    private router:Router) { }

  ngOnInit(): void {
    this.pendingSale=false;
    this.saleS.newSale()
   this.detailSubscribe = this.saleS.getDetail().subscribe(res=>{
      //console.log(res)
      this.details = res
      this.total = this.details.reduce((sum, value)=>(sum +value.cost), 0)
      //console.log(this.total)
    })
    this.getTables()
    this.getTodayCash()
    //this.getRemoves()
    
  }
  getTodayCash(){
    this.cashS.getTodayCash().then((res:any)=>{
      /*this.cash = res;
      console.log(res)
      if(res.status == 'OPEN'){
        this.openCashModal()
      }else if(res.status == 'CLOSED'){
        this.as.mensajeAdvertencia().then(res=>{
          this.router.navigate(['admin/product/'])
        })
      }*/
      if(res.status == 'OPENED' && !this.cashS.isCashOpen()){
        console.log(res)
      }

     
    })
    if(this.cashS.isCashOpen()){
      this.cash = this.cashS.getLocalCash();
      if(this.cash.status == 'CLOSED'){
        /*this.as.mensajeAdvertencia().then(res=>{
         // this.router.navigate(['admin/product/'])
        })*/
        this.openCashModal()
      }
    }else{
      this.openCashModal()
    }
  }
  getRemoves(){
    this.removedSubscribe = this.saleS.getRemoveds().subscribe( (res:any)=>{
      //console.log(res)
      if (!this.pendingDetail.find(item => item.id === res.id && item.name == res.name)&&res.limited) {
        this.pendingDetail.push(res)
        console.log(this.pendingDetail)
        //let prod = await this.ps.getProduct(res.id)
        //console.log(this.products)
      } 
     
    })
  }
  cancel(){
    if(!this.pendingSale){
      this.saleS.deleteSale()
    }else{
      this.as.confirmDeleteAlert().then(res=>{
        if(res.isConfirmed){
                this.table.saleData.status = "CANCELLED"
            //this.saleS.getNumberOfSales(this.cash.date).then(n=>{
              const s = {
                [this.table.saleData.ticketNumber]:this.table.saleData
              }
              this.saleS.confirmSale(s, this.cash.date)
          
            this.details.forEach(a=>{
              if(a.limited){
                a.stock = a.stock + a.cant
                const data = {
                  stock:a.stock
                }
                this.ps.updateProduct(a.id, data)
                console.log(a.stock)
              }
              
            })
            this.table.saleData = ''
            this.table.free = true;
            this.updateTable()
            this.saleS.deleteSale()
        // })
        }
      })
      
    }
    //console.log(this.details)
  }
  removeItem(p, i){
    this.saleS.removeItem(p, i);
    
  }
  ngOnDestroy(): void {
      this.detailSubscribe.unsubscribe()
      if(this.pendingSale){
        this.removedSubscribe.unsubscribe()}
  }
  getTables(){
    this.ts.getTables().subscribe(res=>{
      res.sort((a, b) => {
        if(parseInt(a.id) > parseInt(b.id)) {
          return 1;
        } else if(parseInt(a.id) < parseInt(b.id)) {
          return -1;
        } else {
          return 0;
        }
      });
      this.tables = res.filter(val=>!val.free)
      //console.log(this.tables)
    })
  }
  loadTableDetail(){
    
   
    this.table.saleData.detail.forEach(async a=>{
      //console.log(a)
      let prod:any = await this.ps.getProduct(a.id)
      a.stock = prod.stock
      //this.products.push(prod)
    })
    //console.log(this.products)
    this.getRemoves()
    //console.log(this.table)
    this.saleS.loadSale(this.table.saleData.detail);
    this.client = this.table.saleData.client
    this.doc = this.table.saleData.doc
    this.pendingSale = true;
   
  }
  saveRemovedDetails(){
    this.pendingDetail.forEach((a, index)=>{
      //console.log(a, index)
      if(!this.details.find(item=> item.id === a.id && item.name == a.name)){
        //this.pendingDetail.splice(index, 1)
        const data = {
          stock:this.pendingDetail[index].stock
        }
        this.ps.updateProduct(this.pendingDetail[index].id, data)
        console.log(data)
      }
    })
  }
  updateTable(){
    this.ts.updateTable(this.table.id, this.table).then(()=>{
      this.ps.updateStock(this.table.saleData);
      this.pendingSale = false;
      this.table = ''
      this.pendingDetail = []
      this.client = ''
      this.doc = '0'
      this.saleS.newSale()
      this.removedSubscribe.unsubscribe();
    })
  }
  saveTableDetail(){
    this.table.saleData.cost = this.saleData().cost
    this.table.saleData.costLiteral = this.saleData().costLiteral
    this.table.saleData.client = this.client
    this.table.saleData.doc = this.doc
    this.saveRemovedDetails();
    //console.log(this.pendingDetail)
    this.updateTable();
    this.as.mensajeCorrecto('Mesa guardada','Se agrego registro de mesa correctamente')
   
  }
  saleData(){
    let lit = this.literal.numeroALetras(this.total, {
      plural: 'BOLIVIANOS',
      singular: 'BOLIVIANO',
      centPlural: 'centavos',
      centSingular: 'centavo'
    })
    const data = {
      client:(this.doc == '0')?'SIN NOMBRE':this.client,
      doc:this.doc,
      detail:this.details,
      cost:this.total,
      costLiteral:lit,
      date:this.cash.date,
      ticketNumber:(this.pendingSale)?this.table.saleData.ticketNumber:this.cashS.getLocalCash().ticketNumber,
      billDate:formatDate(new Date(), 'YYYY-MM-dd', 'en'),
      hour:formatDate(new Date(), 'HH:mm', 'en'),
      status:(this.pendingSale)?'PENDING':'PAY'
    }
    return data;
  }
  confirmSale(){
    
   
    //console.log(data)
   /* this.as.confirmAlert().then(result=>{
      console.log(this.details)
    })*/
    /*this.table.saleData.client = (this.pendingSale)?this.table.saleData.client=this.client:''
    this.table.saleData.doc = (this.pendingSale)?this.table.saleData.doc=this.doc:''
    this.table.saleData.cost = (this.pendingSale)?this.saleData().cost:''*/
    this.openSaleModal(this.saleData())
  }
  openSaleModal(data) {
    this.modalRef = this.modalService.open(ConfirmSaleModalComponent,{
      modalClass:'modal-md',
      containerClass:'center',
      ignoreBackdropClick: true,
      data:{saleData:data}
    })
    this.modalRef.onClose.subscribe((res)=>{
      if(res.sale && !res.table){
        this.saleS.newSale()
        this.doc = '';
        this.client = '';
      }else if (res.sale && res.table){
        const data = {
          free:true,
          saleData:''
        }
        this.table.saleData = ''
        this.table.free = true;
        console.log(this.details)
        this.saveRemovedDetails();
        this.updateTable()
        //this.ts.updateTable(this.table.id, data).then(()=>{

        //})
      }
    })
  }
  openNoteModal(data, type){
    this.modalNoteRef = this.modalService.open(NoteModalComponent,{
      modalClass:'modal-md',
      containerClass:'center',
      ignoreBackdropClick: true,
      data:{detail:data, type:type, sale:this.saleData(), saleType:(this.pendingSale)?this.table.id:'Para llevar'}
    })
  }
  openCashModal(){
    this.modalCashRef = this.modalService.open(CashModalComponent,{
      modalClass:'modal-md',
      containerClass:'center',
      ignoreBackdropClick: true
    })
    this.modalCashRef.onClose.subscribe((res)=>{
      if(res && res.status !== 'OPEN')
      {
        this.getTodayCash()
      }
      
    })
  }
  openTableModal(){
    this.modalTableRef = this.modalService.open(OrderTableModalComponent,{
      modalClass:'modal-md',
      containerClass:'center',
      ignoreBackdropClick: true,
      data:{saleData:this.saleData()}
    })
    this.modalTableRef.onClose.subscribe((res)=>{
      if(res.sale){
        this.saleS.newSale()
        this.doc = '';
        this.client = '';
      }
    })
  }
}
