import { Router } from '@angular/router';
import { AlertaModalSucessoComponent } from './../../alertas-compartilhados/alerta-modal-sucesso/alerta-modal-sucesso.component';
import { ClienteService } from './../../services/cliente.service';
import { Cliente, Contato } from './../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();

  @ViewChild(AlertaModalSucessoComponent, {static: false}) modalMsgSucesso: AlertaModalSucessoComponent;

  constructor(private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit() {

    this.cliente.contato = new Contato();

  }

  salvarCliente(form) {
    this.clienteService.salvarCliente(this.cliente).subscribe(
      res => {
        this.modalMsgSucesso.setMsgSucesso('Cliente adicionado com sucesso!');
      },
      err => {
        console.log('Ocorreu um erro');
      }
    );

  }

  redirecionarParaListaCliente() {
    this.router.navigateByUrl('cliente/lista');
  }

}
