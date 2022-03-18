import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs: Observable<any> | any;

  constructor( 
    public chatService: ChatService
   ) { }

  ngOnInit(): void {

    console.log( this.chatService.getUsuariosActivos() )

    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Emitir el obtenerUsuarios
    this.chatService.emitirUsuariosActivos();

  }

}
