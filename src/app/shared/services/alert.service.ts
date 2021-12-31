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
  mensajeAdvertencia()
  {
    return Swal.fire({
      title:'CERRADO',
      text: 'La caja se encuentra cerrada para el dia de hoy',
      icon: 'warning'
    })
  }
}
