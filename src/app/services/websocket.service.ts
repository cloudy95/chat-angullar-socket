import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
   }

  checkStatus(){

    this.socket.on( 'connect', ()=>{
      console.log( 'Conectado al servidor' );
      this.socketStatus = true;
    });

    this.socket.on( 'disconnect', ()=>{
      console.log( 'Desconectado del servidor' );
      this.socketStatus = false;
    })

  }

  // Enviar 
  emit( evento: string, payload?:any, callback?: Function ){

    // emit('Evento', payload, callback?)

    this.socket.emit( evento, payload, callback )

  }

  // Escuchar cualquier evento que emita el servidor
  listen( evento:string ){

    return this.socket.fromEvent( evento )

  }

}
