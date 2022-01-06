import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirmAlert(){
   return Swal.fire({
      title: '¿Esta seguro?',
      text: "Se creara un registro permanente de la venta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    })
  }
  confirmDeleteAlert(){
    return Swal.fire({
       title: '¿Esta seguro?',
       text: "Se eliminara este registro permanentemente",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonText: 'Cancelar',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Confirmar'
     })
   }
   confirmLogout(){
    return Swal.fire({
       title: '¿Esta seguro?',
       text: "Se cerrara la sesion para el usuario actual",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonText: 'Cancelar',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Confirmar'
     })
   }
  mensajeAdvertencia()
  {
    return Swal.fire({
      title:'CERRADO',
      text: 'La caja se encuentra cerrada para el dia de hoy',
      icon: 'warning'
    })
  }
  mensajeAdvertencia2(title, text)
  {
    return Swal.fire({
      title:title,
      text: text,
      icon: 'warning'
    })
  }
  mensajeCorrecto(titulo: string, mensaje: string)
  {
    Swal.fire({
      title:titulo,
      text: mensaje,
      icon: 'success'
    })
  }
}
