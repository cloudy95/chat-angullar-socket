import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMesagge( mensaje: string ){

    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };
    //Emitir
    this.wsService.emit( 'mensaje', payload )

  }
 //Escuchar
  getMessages(){

    return this.wsService.listen( 'mensaje-nuevo' );

  }

  //Escuchar
  getMessagerPrivate(){

    return this.wsService.listen('mensaje-privado')

  }
 //Escuchar
  getUsuariosActivos(){

    return this.wsService.listen( 'usuarios-activos' )

  }
 //Emitir
  emitirUsuariosActivos(){
    return this.wsService.emit( 'obtener-usuarios' );
  }

}
