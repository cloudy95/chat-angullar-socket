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

    const peyload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emit( 'mensaje', peyload )

  }

  getMessages(){

    return this.wsService.listen( 'mensaje-nuevo' );

  }

  getMessagerPrivate(){

    return this.wsService.listen('mensaje-privado')

  }

}
