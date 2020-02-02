import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../../models/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Cliente [] = [];

  tamanhoGridClientes = 12;
  paddindGrid = 4;
  infoComplementaresHabilitado = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
      this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listarClientes().subscribe(
      resultado => this.clientes = resultado,

      err => {
          console.log('Ocorreu um erro ao tentar listar os clientes');
      }
    );
  }

  habilitarBlocoInformacoes() {

    if (this.infoComplementaresHabilitado === false) {
      this.infoComplementaresHabilitado = true;
      this.tamanhoGridClientes = 9;
      this.paddindGrid = 1;
    } else {
      this.infoComplementaresHabilitado = false;
      this.tamanhoGridClientes = 12;
      this.paddindGrid = 4;
    }

  }

}
