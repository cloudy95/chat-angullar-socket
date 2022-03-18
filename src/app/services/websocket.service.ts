import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario | any = null;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.cargarStorage();
    this.checkStatus();
   }

  checkStatus(){

    this.socket.on( 'connect', ()=>{
      console.log( 'Conectado al servidor' );
      this.socketStatus = true;
      this.cargarStorage();
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

  loginWS( nombre: string ){

    return new Promise( ( resolve, reject )=>{

      this.emit( 'configurar-usuario', { nombre }, (resp:any)=>{

        this.usuario = new Usuario( nombre )
        this.guardarStorage();
  
        resolve(resp);
  
      })

    })

  }

  logoutWs(){

    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    }

    this.emit( 'configurar-usuario', payload, ()=>{} );
    this.router.navigateByUrl('')

  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){

    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );

  }

  cargarStorage(){

    const usuario: any = localStorage.getItem( 'usuario' );

    if( usuario ){
 
      this.usuario = JSON.parse(usuario).nombre
      this.loginWS( this.usuario )

    }

  }

}
